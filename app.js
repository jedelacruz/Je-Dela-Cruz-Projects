$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
});

document.addEventListener('mousemove', function(event) {
    var cursor = document.querySelector('.cursor');
    cursor.style.top = event.clientY + 'px';
    cursor.style.left = event.clientX + 'px';
  });

// Get the eye-follow-container and eye-follow-box elements
var container1 = document.querySelectorAll('.eye-follow-container')[0];
var eyeBox1 = document.getElementById('eye1');
var container2 = document.querySelectorAll('.eye-follow-container')[1];
var eyeBox2 = document.getElementById('eye2');

// Calculate the container's boundaries for eye 1
var containerRect1 = container1.getBoundingClientRect();
var containerLeft1 = containerRect1.left;
var containerTop1 = containerRect1.top;
var containerWidth1 = containerRect1.width;
var containerHeight1 = containerRect1.height;

// Calculate the container's boundaries for eye 2
var containerRect2 = container2.getBoundingClientRect();
var containerLeft2 = containerRect2.left;
var containerTop2 = containerRect2.top;
var containerWidth2 = containerRect2.width;
var containerHeight2 = containerRect2.height;

// Define padding value
var padding = 3;

// Listen for mousemove event on the document
document.addEventListener('mousemove', function(e) {
  // Get the current mouse position
  var mouseX = e.pageX;
  var mouseY = e.pageY;

  // Calculate the adjusted position for eye 1 within its container
  var offsetX1 = containerLeft1 + containerWidth1 / 2;
  var offsetY1 = containerTop1 + containerHeight1 / 2;
  var translateX1 = mouseX - offsetX1;
  var translateY1 = mouseY - offsetY1;

  // Calculate the adjusted position for eye 2 within its container
  var offsetX2 = containerLeft2 + containerWidth2 / 2;
  var offsetY2 = containerTop2 + containerHeight2 / 2;
  var translateX2 = mouseX - offsetX2;
  var translateY2 = mouseY - offsetY2;

  // Limit the eye-follow-box positions within their respective containers' boundaries with padding
  var maxTranslateX1 = containerWidth1 / 2 - eyeBox1.offsetWidth / 2 - padding;
  var maxTranslateY1 = containerHeight1 / 2 - eyeBox1.offsetHeight / 2 - padding;
  translateX1 = Math.max(-maxTranslateX1, Math.min(translateX1, maxTranslateX1));
  translateY1 = Math.max(-maxTranslateY1, Math.min(translateY1, maxTranslateY1));

  var maxTranslateX2 = containerWidth2 / 2 - eyeBox2.offsetWidth / 2 - padding;
  var maxTranslateY2 = containerHeight2 / 2 - eyeBox2.offsetHeight / 2 - padding;
  translateX2 = Math.max(-maxTranslateX2, Math.min(translateX2, maxTranslateX2));
  translateY2 = Math.max(-maxTranslateY2, Math.min(translateY2, maxTranslateY2));

  // Calculate rotation angles based on the movement direction for eye 1
  var rotationX1 = -translateY1 / maxTranslateY1 * 10;
  var rotationY1 = translateX1 / maxTranslateX1 * 10;

  // Calculate rotation angles based on the movement direction for eye 2
  var rotationX2 = -translateY2 / maxTranslateY2 * 10;
  var rotationY2 = translateX2 / maxTranslateX2 * 10;

  // Apply transitions and rotations to the eye-follow-boxes
  eyeBox1.style.transition = 'transform 0.3s';
  eyeBox1.style.transform = `translate(${translateX1}px, ${translateY1}px) rotateX(${rotationX1}deg) rotateY(${rotationY1}deg)`;

  eyeBox2.style.transition = 'transform 0.3s';
  eyeBox2.style.transform = `translate(${translateX2}px, ${translateY2}px) rotateX(${rotationX2}deg) rotateY(${rotationY2}deg)`;
});

// Reset the eye-follow-box positions and transitions when the mouse leaves the containers
container1.addEventListener('mouseleave', function() {
  eyeBox1.style.transition = 'transform 0.1s';
  eyeBox1.style.transform = 'translate(0, 0)';
});

container2.addEventListener('mouseleave', function() {
  eyeBox2.style.transition = 'transform 0.1s';
  eyeBox2.style.transform = 'translate(0, 0)';
});

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.querySelector(".project-nav");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

let btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
