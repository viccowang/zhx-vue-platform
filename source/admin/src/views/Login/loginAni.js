let maxParticles = 80
let particles = []
let frequency = 100
let initNum = maxParticles
let maxTime = frequency * maxParticles
let timeToRecreate = false
let canvas, tela

// var tela = document.createElement('canvas')
function initCanvas (id) {
  var tela = document.getElementById(id)
  tela.className = 'login-ani'
  tela.width = document.documentElement.clientWidth
  tela.height = document.documentElement.clientHeight
  window.onresize = () => {
    tela.width = document.documentElement.clientWidth
    tela.height = document.documentElement.clientHeight
  }
  return {
    canvas: tela.getContext('2d'),
    tela
  }
}

class Particle {
  constructor (canvas, options) {
    let colors = ['#a9df85', '#5dc0ad', '#409EFF', '#F06292']
    let types = ['full', 'fill', 'empty']
    this.random = Math.random()
    this.canvas = canvas
    this.progress = 0

    this.x = (document.documentElement.clientWidth / 2) + (Math.random() * 400 - Math.random() * 400)
    this.y = (document.documentElement.clientHeight / 2) + (Math.random() * 400 - Math.random() * 400)
    this.w = document.documentElement.clientWidth
    this.h = document.documentElement.clientHeight
    this.radius = 1 + (10 * this.random)
    this.type = types[this.randomIntFromInterval(0, types.length - 1)]
    this.color = colors[this.randomIntFromInterval(0, colors.length - 1)]
    this.a = 0
    this.s = (this.radius + (Math.random() * 1)) / 20
    // this.s = 12 //Math.random() * 1;
  }

  getCoordinates () {
    return {
      x: this.x,
      y: this.y
    }
  }

  randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  render () {
    // Create arc
    let lineWidth = 0.2 + (2.8 * this.random)
    let color = this.color
    switch (this.type) {
      case 'full':
        this.createArcFill(this.radius, color)
        this.createArcEmpty(this.radius + lineWidth, lineWidth / 2, color)
        break
      case 'fill':
        this.createArcFill(this.radius, color)
        break
      case 'empty':
        this.createArcEmpty(this.radius, lineWidth, color)
        break
    }
  }

  createArcFill (radius, color) {
    this.canvas.beginPath()
    this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    this.canvas.fillStyle = color
    this.canvas.fill()
    this.canvas.closePath()
  }

  createArcEmpty (radius, lineWidth, color) {
    this.canvas.beginPath()
    this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    this.canvas.lineWidth = lineWidth
    this.canvas.strokeStyle = color
    this.canvas.stroke()
    this.canvas.closePath()
  }

  move () {
    this.x += Math.cos(this.a) * this.s
    this.y += Math.sin(this.a) * this.s
    this.a += Math.random() * 0.4 - 0.2

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false
    }
    this.render()
    return true
  }

  calculateDistance (v1, v2) {
    let x = Math.abs(v1.x - v2.x)
    let y = Math.abs(v1.y - v2.y)
    return Math.sqrt((x * x) + (y * y))
  }
}

/*
 * Function to clear layer canvas
 * @num:number number of particles
 */
function popolate (num) {
  for (var i = 0; i < num; i++) {
    setTimeout(
      (function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas))
        }
      }(i))
      , frequency * i)
  }
  return particles.length
}

function clear () {
  // canvas.globalAlpha=0.04;
  canvas.fillStyle = '#f2f2f2'
  canvas.fillRect(0, 0, tela.width, tela.height)
  // canvas.globalAlpha=1;
}

function connection () {
  let oldElement = null
  particles.forEach((element, i) => {
    if (i > 0) {
      let box1 = oldElement.getCoordinates()
      let box2 = element.getCoordinates()
      canvas.beginPath()
      canvas.moveTo(box1.x, box1.y)
      canvas.lineTo(box2.x, box2.y)
      canvas.lineWidth = 0.45
      canvas.strokeStyle = '#e0e0e0'
      canvas.stroke()
      canvas.closePath()
    }

    oldElement = element
  })
}

/*
 * Function to update particles in canvas
 */
function update () {
  clear()
  connection()
  particles = particles.filter(function (p) { return p.move() })
  // Recreate particles
  if (timeToRecreate) {
    if (particles.length < initNum) { popolate(1) }
  }
  requestAnimationFrame(update.bind(this))
}

// Popolate particles
export function startAnimation (id) {
  const cvs = initCanvas(id)
  canvas = cvs.canvas
  tela = cvs.tela
  popolate(maxParticles)
  update()

  // Enable repopolate
  setTimeout(function () {
    timeToRecreate = true
  }, maxTime)
}
