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
    if (dontCut.length === 0) {
      toCut = []
      randomize()
    }
    console.log('Psst, cut the ' + toCut + ' wire(s).')
    console.log('Don\'t cut the ' + dontCut + ' wire(s)!')
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
    $('#sirenSound').get(0).pause()
    clearInterval(intervalID)
    setTimeout(function () {
      $('html').css('background', 'url(img/explosion.jpg) no-repeat center center fixed')
      $('html').css('background-size', 'cover')
      $('#boomSound').get(0).play()
    }, 750)
    $('#blue').off('click')
    $('#green').off('click')
    $('#red').off('click')
    $('#white').off('click')
    $('#yellow').off('click')
  }

  function safeOrBoom () {
    if (leftToCut === 0) {
      $('#sirenSound').get(0).pause()
      $('#yaySound').get(0).play()
      $('.timer').css('color', 'green')
      clearInterval(intervalID)
      $('#blue').off('click')
      $('#green').off('click')
      $('#red').off('click')
      $('#white').off('click')
      $('#yellow').off('click')
    } else if (seconds <= 0) {
      clearInterval(intervalID)
      delayExplode()
    }
  }

  $('#yaySound').on('ended', function () {
    $('#successSound').get(0).play()
  })

  function eventHandler () {
    $('#blue').on('click', function () {
      cut($(this), 'img/cut-blue-wire.png')
      if (dontCut.includes('blue')) {
        delayExplode()
      } else if (toCut.includes('blue')) {
        leftToCut -= 1
        $('#blue').off('click')
      }
    })

    $('#green').on('click', function () {
      cut($(this), 'img/cut-green-wire.png')
      if (dontCut.includes('green')) {
        delayExplode()
      } else if (toCut.includes('green')) {
        leftToCut -= 1
        $('#green').off('click')
      }
    })

    $('#red').on('click', function () {
      cut($(this), 'img/cut-red-wire.png')
      if (dontCut.includes('red')) {
        delayExplode()
      } else if (toCut.includes('red')) {
        leftToCut -= 1
        $('#red').off('click')
      }
    })

    $('#white').on('click', function () {
      cut($(this), 'img/cut-white-wire.png')
      if (dontCut.includes('white')) {
        delayExplode()
      } else if (toCut.includes('white')) {
        leftToCut -= 1
        $('#white').off('click')
      }
    })

    $('#yellow').on('click', function () {
      cut($(this), 'img/cut-yellow-wire.png')
      if (dontCut.includes('yellow')) {
        delayExplode()
      } else if (toCut.includes('yellow')) {
        leftToCut -= 1
        $('#yellow').off('click')
      }
    })
  }

  randomize()
  updateTime()
  eventHandler()

  function cut (uncut, cutImage) {
    uncut.attr('src', cutImage)
    $('#cutSound').get(0).play()
  }

  function reset () {
    toCut = []
    dontCut = []

    $('#sirenSound').get(0).play()
    $('#successSound').get(0).pause()
    $('#blue').attr('src', 'img/uncut-blue-wire.png')
    $('#green').attr('src', 'img/uncut-green-wire.png')
    $('#red').attr('src', 'img/uncut-red-wire.png')
    $('#white').attr('src', 'img/uncut-white-wire.png')
    $('#yellow').attr('src', 'img/uncut-yellow-wire.png')
    $('html').css('background', 'url(img/simcity.jpg) no-repeat center center fixed')
    $('html').css('background-size', 'cover')
    $('.timer').css('color', 'red')
    seconds = 30
    randomize()
    updateTime()
    eventHandler()
  }

  $('.reset').on('click', function () {
    reset()
  })
})
