px.import({       scene: 'px:scene.1.js',
                  keys:  'px:tools.keys.js',
}).then( function importsAreReady(imports)
{
  var scene = imports.scene;
  var root  = imports.scene.root;
  var keys  = imports.keys;
  var base  = px.getPackageBaseFilePath();

  var hasShaders    = true;
  var intervalTimer = null;
  var index         = 0;

  if( scene.capabilities                  == undefined ||
      scene.capabilities.graphics         == undefined ||
      scene.capabilities.graphics.shaders == undefined ||
      scene.capabilities.graphics.shaders < 1)
  {
    // If Shader is not supported...
    hasShaders = false;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var rect = scene.create({ t: 'rect', parent: root, fillColor: '#000', x: 10, y: 10, w: 1260, h: 700, cx: 1260/2, cy: 700/2, focus: true});

  var toys = [
      "FluxCore.frg",
      // "InsideTheMatrix.frg",  // ES 3.0 :(
      "InfinityMatrixLite.frg",
      "ElectricSinusoid.frg",
      "LightsInSmoke.frg",
      "BokehTraffic.frg",
      "TambysSnowflakes.frg",
      "BokehBlur.frg",
      "UltraLiquidBokeh.frg",
      "TileableWaterCaustic.frg",
      "LiquidCubes.frg",
      "RaymarchedReflections.frg",
      "Supernovae.frg",
      "Protophore.frg",
      "GalaxyOfUniverses.frg",
      "AwesomeStar.frg",
      "MandelbrotSmooth.frg",
      "Threads.frg",
      "ProteanClouds.frg",
      "GiveItMoire.frg",
      "Seascape.frg",
      "Creation.frg",
      "Flame.frg",
      "Warping.frg",
      "Voronoise.frg",
      "MengerSponge.frg",
      "MandelbrotDistance.frg",
      "BallofFire.frg",
      "RayTracingSphereExample.frg",
      "Bubbles.frg",
      "OnOffSpikes.frg",
      // "InversionMachine.frg", // IFFY
      "DiskIntersection.frg",
      "CubesAndSpheres.frg",
  ];

  var CaptionBG = scene.create({ t: 'rect', parent: root, fillColor: '#0008', x: scene.w/2, y: rect.h - 50, w: rect.w, h: 40, a: 0});
  var Caption   = scene.create({ t: 'textBox', w: rect.w, h: 40, parent: CaptionBG, a: 1,
                      pixelSize: 24, textColor: '#fff', text: '...', interactive: false,
                      alignVertical:   scene.alignVertical.CENTER, 
                      alignHorizontal: scene.alignHorizontal.CENTER});

  var MessageBG = scene.create({ t: 'rect', parent: root, fillColor: '#0008', x: 10, y: 10, w: 120, h: 40, a: 0});
  var Message   = scene.create({ t: 'textBox', w: 120, h: 40, parent: MessageBG, a: 1,
                      pixelSize: 24, textColor: '#fff', text: '...', interactive: false,
                      alignVertical:   scene.alignVertical.CENTER, 
                      alignHorizontal: scene.alignHorizontal.CENTER});

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function showHide(o)
  {
    o.animateTo({a: 1.0}, 0.25);
    setTimeout( () => { o.animateTo({a: 0.0}, 0.2); }, 2000 );
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function showCaption(txt, x = 0.5, y = (rect.h - 50) )
  {
    Caption.text = txt;

    Caption.ready.then( () =>
    {
      var metrics = Caption.measureText();

      CaptionBG.w = (metrics.bounds.x2 -  metrics.bounds.x1) + 20;
      CaptionBG.h = (metrics.bounds.y2 -  metrics.bounds.y1) + 10;

      Caption.w   = CaptionBG.w;
      Caption.h   = CaptionBG.h;

      CaptionBG.x = x;
      CaptionBG.x = y;

      if(x == 0.5)
      {
        CaptionBG.x = (scene.w - CaptionBG.w) / 2;
      }

      showHide(CaptionBG);
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function CreateShader(filename)
  {
    var name = filename.split('.').slice(0, -1).join('.')

    showCaption(name);

    var shaderToy = scene.create({
                 t: 'shaderResource',
          fragment: base + "/shaders/" + filename,
          uniforms:
          {
            "u_time"      : "float",
            "u_resolution": "vec2"
          }
        });

    shaderToy.ready.then( () =>
    {
      rect.effect = shaderToy;
    });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var paused = false;

  rect.on('onKeyUp', function(e)
  {
    if(e.keyCode == keys.SPACE)
    {
      // Handle KEYUP event
      paused = !paused;

      Message.text = (paused ? "PAUSED" : "Unpaused");
      showHide( MessageBG );
    }
    else
    if(e.keyCode == keys.LEFT)
    {
      Message.text = "PREV";
      showHide( MessageBG );

      PrevShader();
    }
    else
    if(e.keyCode == keys.RIGHT)
    {
      Message.text = "NEXT";
      showHide( MessageBG );

      NextShader();
    }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function NextShader()
  {
    index++;
    if(index >= toys.length )
      index = 0; // WRAP

    ResetInterval();
    CreateShader(toys[index]);
  }

  function PrevShader()
  {
    index--;
    if(index < 0 )
      index = toys.length - 1; // WRAP

    ResetInterval();
    CreateShader(toys[index]);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function ResetInterval()
  {
    if(intervalTimer)
    {
      clearInterval(intervalTimer);
    }

    intervalTimer = setInterval( () =>
    {
      if(paused == false)
      {
        NextShader();

  //      console.log("Shader Index: " + index);
      }
    }, 4000);
  }

  if(hasShaders == true)
  {
    CreateShader(toys[index++]);
    ResetInterval();
  }


  scene.on("onResize", function (e)
  {
    updateSize(e.w, e.h);
  });

  function updateSize(w, h)
  {
    rect.w = w - 10;
    rect.h = h - 10;

    Caption.w   = rect.w;
    CaptionBG.w = rect.w;
    CaptionBG.y = rect.h - 50;
  }

  // rect.ready.then( () =>
  // {
  //   rect.animateTo({ r: 360}, 20);
  // });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

}).catch(function importFailed(err) {
  console.error('Import for ShaderToy2.js failed: ' + err);
});