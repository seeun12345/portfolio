$(document).ready(function () {
  gsap.registerPlugin(Flip);
  Sticker.init(".sticker");

  // section sliding

  const section = $("section");

  let sectionSpeed = 700;
  let sectionPos = [];
  let sectionIndex = 0;
  let scrolling = false;
  let wheeling = true;

  function wheelCheckFn() {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 680) {
      wheeling = false;
    } else {
      wheeling = true;
    }
  }

  wheelCheckFn();

  function resetSection() {
    $.each(section, function (index, item) {
      let tempY = $(this).offset().top;
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });
  }

  resetSection();

  let sectionTotal = sectionPos.length;

  let resizeTimer;
  $(window).on("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeFunction, 500);
  });

  function resizeFunction() {
    wheelCheckFn();
    resetSection();
    sectionColor();
    if (wheeling) {
      $("html").animate(
        { scrollTop: sectionPos[sectionIndex] },
        500,
        function () {
          scrolling = false;
        }
      );
    }
  }

  const sectionLink = $("nav ul li a");
  $.each(sectionLink, function (index, item) {
    $(this).click(function (e) {
      e.preventDefault();
      moveSection(index);
    });
  });

  $(window).on("mousewheel DOMMouseScroll", function (event) {
    let distance = event.originalEvent.wheelDelta;

    if (wheeling != true) {
      return;
    }
    if (scrolling) {
      return;
    }
    scrolling = true;

    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
    }
    sectionColor();

    if (sectionIndex === 1) {
      ball_motion();
      gsap.from($("#about h3"), {
        opacity: 0,
        y: -50,
        duration: 0.7,
        stagger: 0.3,
        delay: 0.5,
      });
    } else {
      $(".symbol").each(function () {
        var container = $(this);
        var balls = container.find("> .ball");
        balls.off("mouseenter mouseleave");
        gsap.killTweensOf(container.find(".dream"));
        gsap.killTweensOf(container.find(".goal"));
        gsap.killTweensOf(container.find(".figure"));
      });
    }

    gsap.to($("html"), sectionSpeed / 1000, {
      scrollTop: sectionPos[sectionIndex],
      onComplete: function () {
        scrolling = false;
      },
    });
  });

  function sectionColor() {
    let windowWidth = window.innerWidth;
    sectionLink.removeClass("active");
    $("header").removeClass("on");
    if (windowWidth <= 680) {
      sectionLink.removeClass("active");
    } else {
      if (sectionIndex === 0) {
        sectionLink.removeClass("active");
      } else if (sectionIndex === 1) {
        $(".about").addClass("active");
      } else if (sectionIndex === 6) {
        $(".contact").addClass("active");
        $("header").addClass("on");
      } else if (sectionIndex === 5) {
        $(".work").addClass("active");
      } else {
        $(".work").addClass("active");
        $("header").addClass("on");
      }
    }
  }

  sectionColor();

  $(window).scroll(function () {
    if (wheeling) {
      return;
    }
    let tempY = $(window).scrollTop();
    tempY = Math.ceil(tempY);
    for (let i = sectionTotal - 1; i >= 0; i--) {
      let tempMax = sectionPos[i];
      if (tempY >= tempMax) {
        sectionIndex = i;
        break;
      }
    }
  });

  $("html").animate(
    {
      scrollTop: sectionPos[sectionIndex],
    },
    500,
    function () {
      scrolling = false;
    }
  );

  // cursor

  const cursor = $(".cursor");
  const cursorWrap = $(".cursor-wrap");

  $(window).on("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    cursor.css("transform", "translate(" + x + "px, " + y + "px)");
  });
  $(".logo")
    .on("mouseenter", function () {
      cursorWrap.addClass("on");
    })
    .on("mouseleave", function () {
      cursorWrap.removeClass("on");
    });
  $("button")
    .on("mouseenter", function () {
      cursorWrap.addClass("on");
    })
    .on("mouseleave", function () {
      cursorWrap.removeClass("on");
    });

  // page 1

  const tl1 = gsap.timeline({
    defaults: {
      duration: 0.1,
    },
  });
  const leaf = $(".leaf");
  const flower = $(".flower");
  gsap.set(leaf, {
    scale: 0,
  });
  gsap.set(flower, {
    width: 0,
  });
  gsap.set(".scroll-arrow", {
    scale: 0,
  });

  // leaf animation

  function leafMouseMovement() {
    let windowWidth;
    let windowHeight;

    const setWindowSize = () => {
      windowWidth = $(window).innerWidth();
      windowHeight = $(window).innerHeight();
    };

    setWindowSize();

    $(window).on("resize", () => {
      setWindowSize();
    });

    $(window).on("mousemove", (e) => {
      const xPercent = gsap.utils.mapRange(0, windowWidth, -20, 20, e.clientX);
      const yPercent = gsap.utils.mapRange(0, windowHeight, -20, 20, e.clientY);
      const rotateRange = gsap.utils.clamp(
        -1,
        1,
        gsap.utils.mapRange(
          windowWidth * 0.25,
          windowWidth * 0.75,
          1,
          -1,
          e.clientX
        )
      );
      leaf.css({
        transform: `translate(${xPercent}%, ${yPercent}%) rotate(${
          yPercent * 1 * rotateRange
        }deg)`,
      });
    });
  }
  leafMouseMovement();

  // timeline

  tl1
    .to(
      ".line-1 .words span",
      {
        color: "#2cf71a",
        ease: "power3.inOut",
        duration: 0.5,
        stagger: {
          each: 0.05,
          repeat: 1,
          yoyo: true,
        },
      },
      "a"
    )
    .to(
      leaf,
      {
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.5,
      },
      "a"
    )
    .to(
      ".w",
      {
        rotationY: 540,
        duration: 1,
        yoyo: true,
        yoyoEase: "power2.out",
      },
      "b"
    )
    .from(
      ".line-2 span",
      {
        opacity: 0,
        y: 100,
        duration: 0.5,
        scale: 0.6,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.05,
      },
      "b"
    )
    .to(
      ".line-2",
      {
        x: 230,
        duration: 0.5,
      },
      "c"
    )
    .to(
      ".e",
      {
        rotationY: 540,
        duration: 1,
        yoyo: true,
        yoyoEase: "power2.out",
      },
      "c"
    )
    .from(
      ".line-3 span",
      {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.03,
      },
      "c"
    )
    .to(
      ".line-3 span",
      {
        color: "#f609eb",
        ease: "power3.inOut",
        duration: 0.5,
        stagger: {
          each: 0.03,
          repeat: 1,
          yoyo: true,
        },
      },
      "c"
    )
    .to(
      ".flower",
      {
        width: 125,
        duration: 0.5,
        ease: "power4.out",
      },
      "d"
    )
    .from(
      ".sticker",
      {
        scale: 0,
        ease: "back.out(1.4)",
        duration: 1,
        stagger: {
          each: 0.1,
        },
      },
      "d"
    )
    .to(
      ".scroll-arrow",
      {
        scale: 1,
        ease: "power4.out",
        duration: 0.5,
      },
      "d"
    )
    .to(".scroll-arrow img", {
      duration: 0.9,
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
    .to(".flower", {
      rotate: "360deg",
      repeat: -1,
      repeatDelay: 0.2,
      ease: "circ",
      duration: 3.5,
    });

  let logo = $(".logo");
  let FlipLeaf = $(".leaf2");
  let FlipFlower = $(".flower2");
  $(window).on("scroll", () => {
    let state1 = Flip.getState(FlipLeaf);
    let state2 = Flip.getState(FlipFlower);
    logo.append(FlipLeaf);
    logo.append(FlipFlower);
    Flip.from(state1, {
      duration: 0.5,
      ease: "power1.out",
    });
    Flip.from(state2, {
      duration: 0.5,
      ease: "power1.out",
    });
  });

  // page 2

  // ball motion

  function ball_motion() {
    $(".symbol").each(function () {
      var speed = 30;
      var container = $(this);
      var balls = container.find("> .ball");
      var dream = container.find(".dream");
      var goal = container.find(".goal");
      var figure = container.find(".figure");
      var ball_size = dream.width();
      var win_w = container.parent().width();
      var wall_left_pos = 0 - ball_size;
      var wall_right_pos = win_w;

      var ball_tween_01 = gsap.fromTo(
        dream,
        {
          left: wall_left_pos,
        },
        {
          id: "dream",
          duration: speed / 1.5,
          left: wall_right_pos,
          ease: Linear.easeNone,
          repeat: -1,
        }
      );

      var ball_tween_02 = gsap.fromTo(
        goal,
        {
          left: wall_left_pos,
        },
        {
          id: "goal",
          duration: speed * 2,
          left: wall_right_pos,
          ease: Linear.easeNone,
          repeat: -1,
        }
      );

      var ball_tween_03 = gsap.fromTo(
        figure,
        {
          left: wall_right_pos,
        },
        {
          id: "figure",
          duration: speed,
          left: wall_left_pos,
          repeat: -1,
          ease: Linear.easeNone,
        }
      );

      ball_tween_01.progress(0.1).pause();
      ball_tween_02.progress(0.5).pause();
      ball_tween_03.progress(0.2).pause();

      balls.each(function () {
        var $this = $(this);
        var tween_id = $this.attr("data-tween-id");
        var current_tween = gsap.getById(tween_id);
        var over_flag = false;

        $this
          .mouseenter(function () {
            if (over_flag) return;
            over_flag = true;
            gsap.to(current_tween, { duration: 0, timeScale: 10 });
          })
          .mouseleave(function () {
            gsap.to(current_tween, {
              duration: 1,
              timeScale: 1,
              onComplete: function () {
                over_flag = false;
              },
            });
          });
      });
      ball_tween_01.play();
      ball_tween_02.play();
      ball_tween_03.play();
    });
  }

  // work

  let text = $(".track .content");
  let track = $(".track");
  text.clone().appendTo(track);
  gsap.to(track, 25, {
    x: -text.width(),
    ease: Linear.easeNone,
    repeat: -1,
  });
});
