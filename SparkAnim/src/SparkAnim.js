px.import({       scene: 'px:scene.1.js'
}).then( function importsAreReady(imports)
{
  module.exports.wantsClearscreen = function()
  {
    return true; // return 'false' to skip system black/blank draw
  };

 var scene = imports.scene;
 var root  = imports.scene.root;


    //   CODE HERE !
    

}).catch(function importFailed(err) {
  console.error('Import for SparkAnim.js failed: ' + err);
});