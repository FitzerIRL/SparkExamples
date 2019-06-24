px.import({       scene: 'px:scene.1.js'
}).then( function importsAreReady(imports)
{
  var scene = imports.scene;
  var root  = imports.scene.root;
  var base  = px.getPackageBaseFilePath();

  if( scene.capabilities                  == undefined ||
      scene.capabilities.graphics         == undefined ||
      scene.capabilities.graphics.shaders == undefined ||
      scene.capabilities.graphics.shaders < 1)
  {
    // If Shader is not supported...
    hasShaders = false;
    throw "EXPCEPTION - Shaders are not supported in this version of Spark..."
  }

  const STRETCH = scene.stretch.STRETCH;

  var URL = base + "/test-pattern.png";

  var xx = 300;
  var yy = scene.h/2;

  var ar = 16/9;

  var w1 = 350;
  var w2 = w1 + 50;

  var h1 = w1 / ar;
  var h2 = h1 + 50;

  var lw = 1;

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var bg             = scene.create({ t: 'rect',  parent:     root, x: 10, y: 10, w: 1260, h:  700, fillColor: '#111', interactive: true});

  var title = scene.create({t:'textBox', w: bg.w, h: 50, parent: bg, x: 0, y: 30,
                     pixelSize: 60, textColor: '#aaa', text:  'Blur Shader Tests', interactive: false,
                     alignVertical:   scene.alignVertical.CENTER,
                     alignHorizontal: scene.alignHorizontal.CENTER});

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var image_obj      = scene.create({ t: 'rect', parent:        bg, x: xx,   y: scene.h/2 + 100, w: w2, h: h2, px: 0.5, py: 0.5, lineColor: "#444", lineWidth: lw,fillColor: "#0000", focus: true });
  var image          = scene.create({ t: 'image',parent: image_obj, x: w2/2, y:  10, w: w1, h: h1, px: 0.5, py: 0.0, url: URL, interactive: false, clip: true, stretchX: STRETCH, stretchY: STRETCH, id: "testImage" });

  var slider1_bg     = scene.create({ t: 'rect', parent: image_obj,  fillColor: '#222', lineColor: '#333', lineWidth: 1, x: image_obj.w/2, y: image_obj.h - 10, w: 300, h: 20, px: 0.5, py: 1.0, interactive: true, focus: true });
  var slider1_knob   = scene.create({ t: 'rect', parent: slider1_bg, fillColor: '#444', lineColor: '#555', lineWidth: 1, x: 0,      y: 10,         w:  16, h: 16, px: 0.0, py: 0.5, interactive: true });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var text_obj       = scene.create({ t: 'rect', parent:       bg, x: xx, y: scene.h/2 - 150, w:  w2, h: 120, px: 0.5, py: 0.5, lineColor: "#444", lineWidth: lw, fillColor: "#0000", focus: true });
  var text           = scene.create({ t: 'text', parent: text_obj, x:  text_obj.w/2, y:  20, w: text_obj.w, h: 100,px: 0.5, py: 0.0,
                                      pixelSize: 44, textColor:'#fff', text:  'Blurring', interactive: false, id: "testText1" });

  var slider2_bg     = scene.create({ t: 'rect', parent: text_obj,   fillColor: '#222', lineColor: '#333', lineWidth: 1, x: text_obj.w/2, y: text_obj.h - 10, w: 300, h: 20, px: 0.5, py: 1.0, interactive: true, focus: true });
  var slider2_knob   = scene.create({ t: 'rect', parent: slider2_bg, fillColor: '#444', lineColor: '#555', lineWidth: 1, x: 0,      y: 10,          w:  16, h: 16, px: 0.0, py: 0.5, interactive: true });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var combo_obj      = scene.create({ t: 'rect', parent:        bg, x: 900,  y: scene.h/2, w: w2, h: h2, px: 0.5, py: 0.5, lineColor: "#444", lineWidth: lw,fillColor: "#0000", focus: true });
  var combo_image    = scene.create({ t: 'image',parent: combo_obj, x: w2/2, y:  10, w: w1, h: h1, px: 0.5, py: 0.0, url: URL, interactive: false, clip: true, stretchX: STRETCH, stretchY: STRETCH, id: "testImage" });

  var combo_text     = scene.create({ t: 'text', parent: combo_image, x:  combo_image.w/2, y:  combo_obj.h/2, w: combo_obj.w, h: 100,px: 0.5, py: 0.5,
                                      pixelSize: 44, textColor:'#00f', text:  'Blurring', interactive: false, id: "testText2" });

  var slider3_bg     = scene.create({ t: 'rect', parent: combo_obj,  fillColor: '#222', lineColor: '#333', lineWidth: 1, x: combo_obj.w/2, y: combo_obj.h - 10, w: 300, h: 20, px: 0.5, py: 1.0, interactive: true, focus: true });
  var slider3_knob   = scene.create({ t: 'rect', parent: slider3_bg, fillColor: '#444', lineColor: '#555', lineWidth: 1, x: 0,      y: 10,          w:  16, h: 16, px: 0.0, py: 0.5, interactive: true });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var blurShader = scene.create({  t:'shaderResource',
                        fragment: base + "/BlurShader.frg",
                        uniforms:
                              {
                                  "u_direction"   : "vec2",
                                  "u_kernelRadius": "float",
                                  "s_texture"     : "sampler2D"
                              } });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  var drag_startX    = 0;
  var slider1_down   = false;
  var slider1_startX = 0;

  slider1_knob.on('onMouseUp',    (e) =>  { slider1_down = false;  e.stopPropagation(); });
  slider1_knob.on('onMouseEnter', ( ) =>  { slider1_knob.fillColor = '#666'; });
  slider1_knob.on('onMouseLeave', ( ) =>  { slider1_knob.fillColor = '#444'; });
  slider1_bg  .on('onMouseLeave', ( ) =>  { slider1_knob.fillColor = '#444'; });

  slider1_bg  .on('onMouseUp',    (e) =>
  {
    var max_w = (slider1_bg.w - slider1_knob.w);
    var pos   = e.x;

    slider1_knob.x = pos - slider1_knob.w/2;

    var pc = ( pos / max_w * 100.0);
    doImageBlur(image, pc);
  });

  slider1_knob.on('onMouseDrag',  (e) =>
  {
    if(slider1_down == false)
    {
      drag_startX    = e.x;
      slider1_startX = slider1_knob.x;
      slider1_down   = true;
    }

    var max_w = (slider1_bg.w - slider1_knob.w);
    var dx    = (e.x - drag_startX); // drag delta
    var pos   = Math.max(0, Math.min(dx + slider1_startX, max_w));

    slider1_knob.x = pos;

    var pc = ( pos / max_w * 100.0);

    console.log(" Slider1 Power: " + pc );

    doImageBlur(image, pc);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var slider2_down   = false;
  var slider2_startX = 0;

  slider2_knob.on('onMouseUp',    (e) =>  { slider2_down = false;  e.stopPropagation(); });
  slider2_knob.on('onMouseEnter', ( ) =>  { slider2_knob.fillColor = '#666'; });
  slider2_knob.on('onMouseLeave', ( ) =>  { slider2_knob.fillColor = '#444'; });
  slider2_bg  .on('onMouseLeave', ( ) =>  { slider2_knob.fillColor = '#444'; });

  slider2_bg  .on('onMouseUp',    (e) =>
  {
    var max_w = (slider2_bg.w - slider2_knob.w);
    var pos   = e.x;

    slider2_knob.x = pos - slider2_knob.w/2;

    var pc = ( pos / max_w * 100.0);
    doImageBlur(text, pc);
  });

  slider2_knob.on('onMouseDrag',  (e) =>
  {
    if(slider2_down == false)
    {
      drag_startX    = e.x;
      slider2_startX = slider2_knob.x;
      slider2_down   = true;
    }

    var max_w = (slider2_bg.w - slider2_knob.w);
    var dx    = (e.x - drag_startX); // drag delta
    var pos   = Math.max(0, Math.min(dx + slider2_startX, max_w));

    slider2_knob.x = pos;

    var pc = ( pos / max_w * 100.0);

    console.log(" Slider2 Power: " + pc );

    doImageBlur(text, pc);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  var slider3_down   = false;
  var slider3_startX = 0;


  slider3_knob.on('onMouseUp',    (e) =>  { slider3_down = false;  e.stopPropagation(); });
  slider3_knob.on('onMouseEnter', ( ) =>  { slider3_knob.fillColor = '#666'; });
  slider3_knob.on('onMouseLeave', ( ) =>  { slider3_knob.fillColor = '#444'; });
  slider3_bg  .on('onMouseLeave', ( ) =>  { slider3_knob.fillColor = '#444'; });

  slider3_bg  .on('onMouseUp',    (e) =>
  {
    var max_w = (slider3_bg.w - slider3_knob.w);
    var pos   = e.x;

    slider3_knob.x = pos - slider3_knob.w/2;

    var pc = ( pos / max_w * 100.0);
    doImageBlur(combo_image, pc);
  });

  slider3_knob.on('onMouseDrag',  (e) =>
  {
    if(slider3_down == false)
    {
      drag_startX    = e.x;
      slider3_startX = slider3_knob.x;
      slider3_down   = true;
    }

    var max_w = (slider3_bg.w - slider3_knob.w);
    var dx    = (e.x - drag_startX); // drag delta
    var pos   = Math.max(0, Math.min(dx + slider3_startX, max_w));

    slider3_knob.x = pos;

    var pc = ( pos / max_w * 100.0);

    console.log(" Slider3 Power: " + pc );

    doImageBlur(combo_image, pc);
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function doImageBlur(obj, pc)
  {
    var blurAmount   = pc / 30.0;
    var kernelRadius = Math.max(1, blurAmount /4);

    obj.effect =
    [
      {
          name: "Pass 1",
        shader: blurShader,
      uniforms: {
                  u_kernelRadius: kernelRadius,
                  u_direction:    [blurAmount, 0]  // HORIZONTAL
                }
      },
      {
          name: "Pass 2",
        shader: blurShader,
      uniforms: {
                  u_kernelRadius: kernelRadius,
                  u_direction:    [0, blurAmount]  // VERTICAL
                }
      }
    ];

    console.log("obj.id: " + obj.id + "  pc: " + pc +  "%  BLURRED !!!");
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

}).catch(function importFailed(err) {
  console.error('Import for BlurShader2.js failed: ' + err);
});