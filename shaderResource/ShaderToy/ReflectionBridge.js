px.import({       scene: 'px:scene.1.js'
}).then( function importsAreReady(imports)
{
  var scene = imports.scene;
  var root  = imports.scene.root;
  var base  = px.getPackageBaseFilePath();

  var hasShaders    = true;

  const STRETCH = scene.stretch.STRETCH;

  if( scene.capabilities                  == undefined ||
      scene.capabilities.graphics         == undefined ||
      scene.capabilities.graphics.shaders == undefined ||
      scene.capabilities.graphics.shaders < 1)
  {
    // If Shader is not supported...
    hasShaders = false;
  }

  var ss    = 0.9;
  var bg    = scene.create({ t: 'rect',  parent: root, x:        10, y:        10, w: 1260, h: 700, fillColor: '#111', interactive: false});
  var image = scene.create({ t: 'image', parent: root, x: scene.w/2, y: scene.h/2, w: 1280, h: 720, px: 0.5, py: 0.5, url: base + "/images/bridge.jpg", stretchX: STRETCH, stretchY: STRETCH, interactive: false });

  var clip_obj = scene.create({ t: 'object', parent: image, x: scene.w/2, y: scene.h/2, fillColor: "#888", w: 300, h: 550, px: 0.5, py: 0.5, interactive: false });
  var logo     = scene.create({ t: 'image',  parent: clip_obj, x: 10, y: 300, w: 100, h: 100, cx: 128, cy: 128, url: base + "/images/Spark_logo256px.png", interactive: false });

  setTimeout( () => {
    logo.animateTo({ y: 10 }, 2.5);

    setTimeout( () => {
      logo.animateTo({ y: 300 }, 2.5);
    }, 8000)

  }, 2000)
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function CreateShader(filename)
  {
    var shader = scene.create({
                 t: 'shaderResource',
          fragment: base + "/shaders/" + filename,
          uniforms:
          {
            "u_time"      : "float",
            "u_resolution": "vec2",
            "s_texture"   : "sampler2D"
          }
        });

        return shader;
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  if(hasShaders == true)
  {
    image.effect = CreateShader("WaterReflection.frg");
  }

  scene.on("onResize", function (e)
  {
    updateSize(e.w, e.h);
  });

  function updateSize(w, h)
  {
    var ww = w * ss
    var hh = h * ss

    var xx = w/2;
    var yy = h/2;

    image.animateTo({ w: ww, h: hh }, 0.5);
  }

  updateSize(scene.w, scene.h);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

}).catch(function importFailed(err) {
  console.error('Import for RainyBridge.js failed: ' + err);
});