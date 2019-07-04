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
  var index         = -1;

  if( scene.capabilities                  == undefined ||
      scene.capabilities.graphics         == undefined ||
      scene.capabilities.graphics.shaders == undefined ||
      scene.capabilities.graphics.shaders < 1)
  {
    // If Shader is not supported...
    hasShaders = false;
    throw "EXPCEPTION - Shaders are not supported in this version of Spark..."
  }

  var noiseGRAY = scene.create({ id: "noise", t: 'imageResource', url: base + "/images/Gray_Noise_Medium256x256.png" });
  var noiseRGBA = scene.create({ id: "noise", t: 'imageResource', url: base + "/images/RGBA_Noise_Medium256x256.png" });
  var lichen    = scene.create({ id: "noise", t: 'imageResource', url: base + "/images/lichen.jpg" });

//  var img = scene.create({ t: 'image', parent: root, resource: lichen, x: 0, y: 0, interactive: false });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var rect = scene.create({ t: 'rect', parent: root, fillColor: '#000', x: 10, y: 10, w: 1260, h: 700, cx: 1260/2, cy: 700/2, focus: true});
  var fooRGBA = scene.create({ t: 'image', parent: rect, resource: noiseRGBA, x: 0, y: 0, interactive: false, a: 0.01 });
  var fooGRAY = scene.create({ t: 'image', parent: rect, resource: noiseGRAY, x: 0, y: 0, interactive: false, a: 0.01 });

  var header = `////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////
                #ifdef GL_ES
                    precision mediump float;
                #endif

                uniform vec2        u_resolution;
                uniform vec4        u_mouse;

                uniform float       u_time;
                uniform sampler2D   s_texture;

                #define iResolution u_resolution
                #define iTime       u_time
                #define iChannel0   s_texture

                // #define fragCoord   gl_FragCoord
                // #define fragColor   gl_FragColor
                #define iMouse      u_mouse

                #define texture     texture2D
                #define textureLod  texture2D

                // void mainImage(out vec4, in vec2);
                // void main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }
                ////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////
                `;

  var toys = [

      "PlanetShadertoy.frg",
      "TheHomeDrive.frg",
      "FlowOfCells.frg",
      "GeodesicTiling.frg",
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
      "SeascapeSailing.frg",
      "InversionMachine.frg",

//    { filename: "ExplosionEffect.frg",   texture0: noiseRGBA },

    { filename: "Clouds.frg",        texture0: noiseRGBA },
    { filename: "Generators.frg",        texture0: noiseRGBA },
//    { filename: "DigitalBrain.frg",      texture0: noiseRGBA },
    { filename: "2DClouds.frg",        texture0: noiseRGBA },
    { filename: "Oceanic.frg",         texture0: noiseGRAY },
    { filename: "RainierMood.frg",     texture0: noiseRGBA }
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

  function showCaption(index, txt, x = 0.5, y = (rect.h - 50) )
  {
    Caption.text = (index + 1) + ". " + txt;

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

  function isObject(val)
  {
    return val instanceof Object;
  }

  var shaderToy = null;

  function LoadShader(shader)
  {
    var filename = isObject(shader) ? shader.filename : shader;
    var texture0 = isObject(shader) ? shader.texture0 ? shader.texture0 : null : null;

    var name = filename.split('.').slice(0, -1).join('.')

    showCaption(index, name);

    var fileLoadPromise = px.getModuleFile("/shaders/" + filename);
    fileLoadPromise.then(function(shader)
    {
      var main = `void mainImage(out vec4, in vec2);
                  void main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }`;

      var hasMainImage = (shader.indexOf("mainImage(") >= 0);

      // Append "compatibility" header and possible wrapper around "mainImage()" ... if used.
      var src = "data:text/plain," + header + (hasMainImage ? main : "") + shader;

      CreateShader( src, texture0 );
    });
  }

  function CreateShader(shader, texture0 = null)
  {
    shaderToy = scene.create({
                t: 'shaderResource',
          fragment: shader,
          uniforms:
          {
            "u_time"      : "float",
            "u_resolution": "vec2",
            "u_mouse"     : "vec4",
            "s_texture"   : "sampler2D"
          }
        });

    shaderToy.ready.then( () =>
    {
      var config =
      {
        name:  "shaderToy",
        shader: shaderToy,
        uniforms: {}
      };

      if(texture0)
      {
        config.uniforms = { s_texture: texture0 };
      }

      rect.effect = config;
    });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  rect.on('onMouseDrag',  (e) =>
  {
      rect.effect =
      {
          name: "Mouse",
        shader: shaderToy,
      uniforms: {
                  u_mouse: [e.x, e.y, 0, 0]
                }
      };
  });

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

    LoadShader(toys[index]);
    ResetInterval();
  }

  function PrevShader()
  {
    index--;
    if(index < 0 )
      index = toys.length - 1; // WRAP

    LoadShader(toys[index]);
    ResetInterval();
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
      }
    }, 4000);
  }

  noiseRGBA.ready.then( () =>
  {
    console.log("### READY");

    if(hasShaders == true)
    {
      NextShader();
      ResetInterval();
    }
  });


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
  console.error('Import for ShaderToy.js failed: ' + err);
});