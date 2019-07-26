px.import({       scene: 'px:scene.1.js',
                  keys:  'px:tools.keys.js',
}).then( function importsAreReady(imports)
{
  var scene = imports.scene;
  var root  = imports.scene.root;
  var keys  = imports.keys;
  var base  = px.getPackageBaseFilePath();

  var hCENTER = scene.alignHorizontal.CENTER
  var vCENTER = scene.alignVertical.CENTER
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  if( scene.capabilities                  == undefined ||
      scene.capabilities.graphics         == undefined ||
      scene.capabilities.graphics.shaders == undefined ||
      scene.capabilities.graphics.shaders < 1)
  {
    // If Shader is not supported...
    hasShaders = false;
    throw "EXPCEPTION - Shaders are not supported in this version of Spark..."
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var noiseGRAY = scene.create({ t: 'imageResource', url: base + "/images/Gray_Noise_Medium256x256.png" });
  var noiseRGBA = scene.create({ t: 'imageResource', url: base + "/images/RGBA_Noise_Medium256x256.png" });
  var stars     = scene.create({ t: 'imageResource', url: base + "/images/stars.jpg" });
  var organic2  = scene.create({ t: 'imageResource', url: base + "/images/organic2.jpg" });


  var header = `#ifdef GL_ES
                  precision mediump float;
                #endif

                uniform vec2        u_resolution;
                uniform vec4        u_mouse;

                uniform float       u_time;
                uniform sampler2D   s_texture0;
                uniform sampler2D   s_texture1;

                #define mat2x2      mat2
                #define iResolution u_resolution
                #define iTime       u_time
                #define iChannel0   s_texture0
                #define iChannel1   s_texture1

                #define iMouse      u_mouse
                #define texture     texture2D
                #define textureLod  texture2D
                `;

  var toys = [

    // { filename: "FlightOverBespin.frg", texture0: noiseRGBA },

//    { filename: "DoodlingSpeed.frg", texture0: noiseGRAY },

// "HappyJumping.frg",  // ES 3.0 :(

    { filename: "SpaceCurvature.frg",  texture0: stars , texture1: organic2 },

    "FlightOverBespin.frg",

    // { filename: "DoodlingSpeed.frg", texture0: noiseGRAY },

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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var hasShaders    = true;
  var intervalTimer = null;
  var index         = -1;

  var rect      = scene.create({ t: 'object',  parent: root, fillColor: '#0008', x: 10, y: 10, w: 1260, h: 700, cx: 1260/2, cy: 700/2, focus: true});

  var CaptionBG = scene.create({ t: 'rect', parent: root, fillColor: '#0008', x: scene.w/2, y: rect.h - 50, w: rect.w, h: 40, a: 0});
  var Caption   = scene.create({ t: 'textBox', w: rect.w, h: 40, parent: CaptionBG, a: 1,
                      pixelSize: 24, textColor: '#fff', text: '...', interactive: false,
                      alignHorizontal: hCENTER, alignVertical: vCENTER});

  var MessageBG = scene.create({ t: 'rect', parent: root, fillColor: '#0008', x: 10, y: 10, w: 120, h: 40, a: 0});
  var Message   = scene.create({ t: 'textBox', w: 120, h: 40, parent: MessageBG, a: 1,
                      pixelSize: 24, textColor: '#fff', text: '...', interactive: false,
                      alignHorizontal: hCENTER, alignVertical: vCENTER});

  var fooRGBA    = scene.create({ t: 'image', parent: root, resource: noiseRGBA, x: 0, y: 0, interactive: false, a: 0.01 });
  var fooGRAY    = scene.create({ t: 'image', parent: root, resource: noiseGRAY, x: 0, y: 0, interactive: false, a: 0.01 });
  var fooSTARS   = scene.create({ t: 'image', parent: root, resource: stars,     x: 0, y: 0, interactive: false, a: 0.01 });
  var fooORGANIC = scene.create({ t: 'image', parent: root, resource: organic2,  x: 0, y: 0, interactive: false, a: 0.01 });
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
    var texture0 = isObject(shader) ? shader.texture0 : null;
    var texture1 = isObject(shader) ? shader.texture1 : null;
    var texture2 = isObject(shader) ? shader.texture2 : null;

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

      CreateShader( src, texture0 , texture1, texture2 );
    });
  }

  function CreateShader(shader,
                        texture0 = null,
                        texture1 = null,
                        texture2 = null)
  {
    var uniforms =
    {
      "u_time"      : "float",
      "u_resolution": "vec2",
      "u_mouse"     : "vec4"
    }

    // Add UNIFORMS if used ...
    if(texture0) { uniforms[ "s_texture0" ] = "sampler2D"; }
    if(texture1) { uniforms[ "s_texture1" ] = "sampler2D"; }
    if(texture2) { uniforms[ "s_texture2" ] = "sampler2D"; }

    var createCfg =
    {
      t: 'shaderResource',
      fragment: shader,
      uniforms: uniforms
    };

    shaderToy = scene.create( createCfg );

    shaderToy.ready.then( () =>
    {
      var config =
      {
        name:  "shaderToy",
        shader: shaderToy,
        uniforms: {}
      };

      // Configure UNIFORMS if used ...
      if(texture0) { config.uniforms[ "s_texture0" ] = texture0; }
      if(texture1) { config.uniforms[ "s_texture1" ] = texture1; }
      if(texture2) { config.uniforms[ "s_texture2" ] = texture2; }

      // Apply UNIFORMS ...
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