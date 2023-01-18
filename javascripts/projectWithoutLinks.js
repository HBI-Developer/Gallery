$(_ => {
    $("body").on("click", ".box-container .box .buttons .button[href='#']", async function (ev) {

        // Fired when click in button that's not have a link

        // Prevent default

        ev.preventDefault();

        /*
            @variable type contains type of this button [for example Projects images]
            @variable value contains value in [data-value]
        */

        let type = $(this).attr('data-type'),
            value = $(this).attr('data-value');

        switch (type) {
            case 'images': {

                // If type is images

                /*
                    @variable imagesSet contains images of this projects
                    @variable imagesSource contains source where images is exist
                    @variable name contains name of this project
                    @variable numberOfImages contains number of images for this project
                    @variable lang contains lang of website
                */

                let imagesSet = images[+value],
                    imagesSource = imagesSet['general-src'],
                    name = $(this).parents('.box').children('.name').text(),
                    numberOfImages = imagesSet.info.length,
                    lang = localStorage.lang ?? defaultLang;

                // Set value in data-index in project images element

                $(".cover .container .project-images").attr("data-index", value);

                // Set name of project in project name

                $(".cover .container .project-images .project-name").text(name);

                // Empty images element in project images

                $(".cover .container .project-images .images").empty();

                for await (let image of imagesSet.info) {

                    // Add images of this project to images element in project images
                    
                    $(".cover .container .project-images .images").append(`
                        <div class="image" style="background-image: url('${imagesSource}/${image.img}')"></div>
                    `);
                }

                // Active first image

                $(".cover .container .project-images .images .image:first-child").addClass('active');

                // Set description for first image by website lang in description element

                $(".cover .container .project-images .description").text(imagesSet.info[0][lang]);

                // Disabled prev and next arrow

                $(".cover .container .project-images .pagination .prev").addClass("disabled");
                $(".cover .container .project-images .pagination .next").addClass("disabled");

                // Set 1 to current element in project images pagination

                $(".cover .container .project-images .pagination .image-number .current").text("1");

                // Set numberOfImages in all element in project images pagination

                $(".cover .container .project-images .pagination .image-number .all").text(numberOfImages);

                if (numberOfImages > 1) {

                    // If number of images for this project more than one remove disabled from next arrow

                    $(".cover .container .project-images .pagination .next").removeClass("disabled");
                }

                setTimeout(_ => {

                    // After all above commands end

                    // Shown cover element

                    $(".cover").fadeIn();
                }, 0);
                
            break;}

            default: {
                return;
            }
        }
    });

    $("body").on("click", ".cover .container .cover-exit", () => {

        // Fired when click out of project images element

        // Hide cover element

        $(".cover").fadeOut();
    });

    $("body").on("click", `
        .cover .container .project-images .pagination .prev:not(.disabled),
        .cover .container .project-images .pagination .next:not(.disabled)
        `, function() {

            // Fired when click on next or prev arrow and that's not disabled

            /*
                @variable arrow contains direction of this arrow
                @variable imageNumber contains index of active page [Start from 0]
                @variable directionImages contains 1 if body deirection is rtl else contains -1
                @variable index contains value in data-index, this value is index have project images in images array
                @variable lang contains lang of website
            */

            let arrow = $(this).hasClass('prev') ? 'prev' : 'next',
                imageNumber = $(".cover .container .project-images .images .image.active").index(),
                directionImages = $("body").attr('dir') === 'rtl' ? 1 : -1,
                index = +$(this).parents('.project-images').attr('data-index'),
                lang = localStorage.lang ?? defaultLang;

            if (arrow === 'prev') {

                // If this arrow is previous arrow

                if (imageNumber > 0) {

                    // If active image is not first image

                    // Remove class disabled from next pagination

                    $(".cover .container .project-images .pagination .next").removeClass('disabled');

                    // Move images to previous image

                    $(".cover .container .project-images .images .image").css("transform", `translateX(${
                        (((imageNumber - 1) * 100) * directionImages)
                    }%)`);

                    // remove active class from current active image and add it to image before it

                    $(".cover .container .project-images .images .image.active").removeClass('active').prev('.image').addClass('active');

                    // Set description for this image in description element

                    $(".cover .container .project-images .description").text(images[index].info[imageNumber - 1][lang]);

                    // Put image number in current [Previous active image index]

                    $(".cover .container .project-images .pagination .image-number .current").text(imageNumber);

                    if (imageNumber === 1) {

                        // If image number is 1 disabled prev arrow

                        $(this).addClass('disabled');
                    }
                }

            } else if (arrow === 'next') {

                // If this arrow is next arrow

                // @variable numberOfImages contains number of image for this project

                let numberOfimages = $(".cover .container .project-images .images .image").length;

                if (imageNumber < numberOfimages) {

                    // If imageNumber less than numberOfImages

                    // Remove disabled class from prev arrow

                    $(".cover .container .project-images .pagination .prev").removeClass('disabled');

                    // Move images to next image

                    $(".cover .container .project-images .images .image").css("transform", `translateX(${
                        (((imageNumber + 1) * 100) * directionImages)
                    }%)`);

                    // Remove active class from current active image and add it to next image

                    $(".cover .container .project-images .images .image.active").removeClass('active').next('.image').addClass('active');

                    // Set this desctiption to description element by website land

                    $(".cover .container .project-images .description").text(images[index].info[imageNumber + 1][lang]);

                    // Set imageNumber + 2 to current element [previous active image index plus 2]

                    $(".cover .container .project-images .pagination .image-number .current").text(imageNumber + 2);

                    if (imageNumber === numberOfimages - 2) {

                        // If imageNumber equals numberOfImages minus 2

                        // Disabled next arrow

                        $(this).addClass('disabled');
                    }
                }

            }
        }
    );
});