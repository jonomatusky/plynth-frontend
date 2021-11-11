window.AFRAME.registerComponent('cloak', {
  init: function () {
    var geometry = new window.THREE.PlaneGeometry(5, 5)
    var material = new window.THREE.MeshBasicMaterial({ colorWrite: false })
    var plane = new window.THREE.Mesh(geometry, material)
    this.el.object3D.add(plane)
  },
})
