$(_ => {

    $("body").on("click", ".box-container .box .buttons .button[href='#']", async function (ev) {

        ev.preventDefault();

        let type = $(this).attr('data-type'),
            value = $(this).attr('data-value');

        switch (type) {

            case 'images': {

                let imagesSet = images[+value],
                    imagesSource = imagesSet['general-src'],
                    name = $(this).parents('.box').children('.name').text(),
                    numberOfImages = imagesSet.info.length,
                    lang = localStorage.lang ?? defaultLang;

                $(".cover .container .project-images").attr("data-index", value);

                $(".cover .container .project-images .project-name").text(name);

                $(".cover .container .project-images .images").empty();

                for await (let image of imagesSet.info) {
                    
                    $(".cover .container .project-images .images").append(`
                        <div class="image" style="background-image: url('${imagesSource}/${image.img}')"></div>
                    `);

                }

                $(".cover .container .project-images .images .image:first-child").addClass('active');

                $(".cover .container .project-images .description").text(imagesSet.info[0][lang]);

                $(".cover .container .project-images .pagination .prev").addClass("disabled");

                $(".cover .container .project-images .pagination .next").addClass("disabled");

                $(".cover .container .project-images .pagination .image-number .current").text("1");

                $(".cover .container .project-images .pagination .image-number .all").text(numberOfImages);

                if (numberOfImages > 1) {

                    $(".cover .container .project-images .pagination .next").removeClass("disabled");

                }

                setTimeout(_ => {

                    $(".cover").fadeIn();

                }, 0);
                
            break;}

            default: {

                return;

            }

        }

    });

    $("body").on("click", ".cover .container .cover-exit", () => {

        $(".cover").fadeOut();

    });

    $("body").on("click", `
        .cover .container .project-images .pagination .prev:not(.disabled),
        .cover .container .project-images .pagination .next:not(.disabled)
        `, function() {

            let arrow = $(this).hasClass('prev') ? 'prev' : 'next',
                imageNumber = $(".cover .container .project-images .images .image.active").index(),
                directionImages = $("body").attr('dir') === 'rtl' ? 1 : -1,
                index = +$(this).parents('.project-images').attr('data-index'),
                lang = localStorage.lang ?? defaultLang;

            if (arrow === 'prev') {

                if (imageNumber > 0) {

                    $(".cover .container .project-images .pagination .next").removeClass('disabled');

                    $(".cover .container .project-images .images .image").css("transform", `translateX(${
                        (((imageNumber - 1) * 100) * directionImages)
                    }%)`);

                    $(".cover .container .project-images .images .image.active").removeClass('active').prev('.image').addClass('active');

                    $(".cover .container .project-images .description").text(images[index].info[imageNumber - 1][lang]);

                    $(".cover .container .project-images .pagination .image-number .current").text(imageNumber);

                    if (imageNumber === 1) {

                        $(this).addClass('disabled');

                    }

                }

            } else if (arrow === 'next') {

                let numberOfimages = $(".cover .container .project-images .images .image").length;

                if (imageNumber < numberOfimages) {

                    $(".cover .container .project-images .pagination .prev").removeClass('disabled');

                    $(".cover .container .project-images .images .image").css("transform", `translateX(${
                        (((imageNumber + 1) * 100) * directionImages)
                    }%)`);

                    $(".cover .container .project-images .images .image.active").removeClass('active').next('.image').addClass('active');

                    $(".cover .container .project-images .description").text(images[index].info[imageNumber + 1][lang]);

                    $(".cover .container .project-images .pagination .image-number .current").text(imageNumber + 2);

                    if (imageNumber === numberOfimages - 2) {

                        $(this).addClass('disabled');

                    }

                }

            }

        }

    );
    
});