console.log('javascript running')

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded')

// because the script tag for this .js file is in the head &
// not before the end of the body, all the JavaScript code
// has to fit within this function

  var wires = ['blue', 'green', 'red', 'white', 'yellow']
  var toCut = []
  var dontCut = []
  var leftToCut
  var seconds = 30
  var intervalID

  function randomize () {
    wires.forEach(function (color) {
      var chance = Math.random()
      if (chance >= 0.5) {
        toCut.push(color)
      } else {
        dontCut.push(color)
      }
    })
    leftToCut = toCut.length
  }

  function updateTime () {
    clearInterval(intervalID)
    intervalID = setInterval(updateTime, 5)
    seconds = Number(seconds) - 0.005
    seconds = seconds.toFixed(3)
    if (seconds >= 10) {
      $('.timer').text('0:00:' + seconds)
    } else if (seconds < 10) {
      $('.timer').text('0:00:0' + seconds)
    }
    safeOrBoom()
  }

  function delayExplode () {
    clearInterval(intervalID)
    setTimeout(function () {
      $('html').css('background', 'url(img/explosion.jpg) no-repeat center center fixed')
      $('html').css('background-size', 'cover')
    }, 700)
  }

  function safeOrBoom () {
    if (leftToCut === 0) {
      $('.timer').css('color', 'green')
      clearInterval(intervalID)
    } else if (seconds <= 0) {
      clearInterval(intervalID)
      delayExplode()
    }
  }

  randomize()
  console.log('The wires to be cut is/are ' + toCut)
  console.log('The wires not to be cut is/are ' + dontCut)
  updateTime()
  // safeOrBoom()

  function cut (uncut, cutImage) {
    uncut.attr('src', cutImage)
  }

  $('#blue').on('click', function () {
    cut($(this), 'img/cut-blue-wire.png')
    if (dontCut.includes('blue')) {
      delayExplode()
    } else if (toCut.includes('blue')) {
      leftToCut -= 1
    }
  })

  $('#green').on('click', function () {
    cut($(this), 'img/cut-green-wire.png')
    if (dontCut.includes('green')) {
      delayExplode()
    } else if (toCut.includes('green')) {
      leftToCut -= 1
    }
  })

  $('#red').on('click', function () {
    cut($(this), 'img/cut-red-wire.png')
    if (dontCut.includes('red')) {
      delayExplode()
    } else if (toCut.includes('red')) {
      leftToCut -= 1
    }
  })

  $('#white').on('click', function () {
    cut($(this), 'img/cut-white-wire.png')
    if (dontCut.includes('white')) {
      delayExplode()
    } else if (toCut.includes('white')) {
      leftToCut -= 1
    }
  })

  $('#yellow').on('click', function () {
    cut($(this), 'img/cut-yellow-wire.png')
    if (dontCut.includes('yellow')) {
      delayExplode()
    } else if (toCut.includes('yellow')) {
      leftToCut -= 1
    }
  })

  $('.reset').on('click', function () {
    reset()
    randomize()
    console.log('The wires to be cut is/are ' + toCut)
    console.log('The wires not to be cut is/are ' + dontCut)
  })

  function reset () {
    toCut = []
    dontCut = []
    $('#blue').attr('src', 'img/uncut-blue-wire.png')
    $('#green').attr('src', 'img/uncut-green-wire.png')
    $('#red').attr('src', 'img/uncut-red-wire.png')
    $('#white').attr('src', 'img/uncut-white-wire.png')
    $('#yellow').attr('src', 'img/uncut-yellow-wire.png')
    $('html').css('background', 'url(img/simcity.jpg) no-repeat center center fixed')
    $('html').css('background-size', 'cover')
    $('.timer').css('color', 'red')
    seconds = 30
    updateTime()
  }
})
