const slides = document.querySelectorAll(".slide");
const slidesimage= document.querySelectorAll(".slide img")
console.log(slidesimage)
const paginations = document.querySelectorAll(".pagination-item");
const listitem = document.querySelectorAll(".item");
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
let curSlide = 0;
let maxSlide = slides.length - 1;

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });

  // update for pagination
  UpdatePagi_ListItem();
});

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  console.log(curSlide)
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });

  UpdatePagi_ListItem();
});

// add event listener forr all pagination item
paginations.forEach((pagi, indx) => {
  pagi.addEventListener("click", function (e) {
    // slider in here
    renderSLider(e.currentTarget);
    // update pagi and listitem
    UpdatePagi_ListItem();
  });
});

// add event listenr click for all list item
listitem.forEach((item, idx) => {
  item.addEventListener("click", function (e) {
    //   render slide
    renderSLider(e.currentTarget);
    // update pagi listitem
    UpdatePagi_ListItem();
  });
});

function UpdatePagi_ListItem() {
  const element = document.querySelector(
    `.pagination-item[data-index='${curSlide + 1}']`
  );
  for (let i = 0; i < paginations.length; i++) {
    paginations[i].classList.remove("active");
  }
  element.classList.add("active");
  //   update forr list item left
  const item = document.querySelector(
    `.item[data-index='${curSlide + 1}'] img`
  );
  for (let i = 0; i < listitem.length; i++) {
    listitem[i].querySelector("img").classList.remove("active");
  }
  item.classList.add("active");
}

function renderSLider(element) {
  const index = +element.getAttribute("data-index") - 1;
  curSlide = index;
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - index)}%)`;
  });
}

// touch event
let touch = false
slidesimage.forEach((slide) => {
    let clientX
  slide.addEventListener("dragstart", (e) => e.preventDefault());
  slide.addEventListener("touchstart", function (e) {
      clientX =e.touches[0].clientX
  });
  slide.addEventListener("touchmove", function (e) {
    // clientWidth = e.target.offsetWidth;
    // clientX = e.touches[0].clientX;
    // if (clientX < clientWidth) {
    //     touch = true

    //     if(touch){

    //         let indexPagi = document
    //         .querySelector(".pagination-item.active")
    //         .getAttribute("data-index");
    //         curSlide = +indexPagi;
    //         console.log(curSlide)
    //         slides.forEach((slide, indx) => {
    //             slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    //         });
    //         UpdatePagi_ListItem();
    //     }
    // }
  });
  slide.addEventListener("touchend",function(e){
       clientWidth = e.target.offsetWidth;
       let changeClientX = e.changedTouches[0].clientX
       console.log( changeClientX,clientX);
        
    if (changeClientX < clientX) {
        // console.log("??")

            let indexPagi = document
            .querySelector(".pagination-item.active")
            .getAttribute("data-index");
            curSlide = +indexPagi;
            if(curSlide === slides.length ) {
                return
            }
            slides.forEach((slide, indx) => {
                slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            });
            
            UpdatePagi_ListItem();
    }
    if (changeClientX > clientX) {
        let indexPagi = document
        .querySelector(".pagination-item.active")
        .getAttribute("data-index");
         curSlide = +indexPagi - 2
         if(curSlide < 0 ) return
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
        UpdatePagi_ListItem();

     }
  })
});
