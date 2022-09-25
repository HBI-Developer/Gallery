$(() => {
  function generateRandomNumber() {
    var num1 = parseInt(Math.random() * 10, 10),
      num2 = parseInt(Math.random() * 10, 10) * 10,
      num3 = parseInt(Math.random() * 10, 10) * 100,
      num4 = parseInt(Math.random() * 10, 10) * 1000,
      num5 = parseInt(Math.random() * 10, 10) * 10000,
      num6 = parseInt(Math.random() * 10, 10) * 100000,
      num7 = parseInt(Math.random() * 10, 10) * 1000000,
      number = num1 + num2 + num3 + num4 + num5 + num6 + num7;

    return number;
  }

  $("body").on("click", ".body table tbody tr td .startAlgorithm", function () {
    $(".waiting").fadeIn(400, () => {
        let primeNumber,
            groupNumber = generateRandomNumber(),
            thisPrivateNumber,
            secondPrivateNumber;

        while (true) {
        primeNumber = generateRandomNumber();
        if (bigInt(primeNumber).isPrime()) {
            break;
        }
        }

        while (true) {
        thisPrivateNumber = generateRandomNumber();
        if (thisPrivateNumber < primeNumber) {
            break;
        }
        }

        while (true) {
        secondPrivateNumber = generateRandomNumber();
        if (secondPrivateNumber < primeNumber) {
            break;
        }
        }

        $(this).parents(".body").addClass("active");

        let firstPrivateKey = bigInt(
            bigInt(groupNumber).pow(thisPrivateNumber)
        ).mod(primeNumber),
        secondPrivateKey = bigInt(
            bigInt(groupNumber).pow(secondPrivateNumber)
        ).mod(primeNumber),
        firstPublicKey = bigInt(
            bigInt(secondPrivateKey).pow(thisPrivateNumber)
        ).mod(primeNumber),
        secondPublicKey = bigInt(
            bigInt(firstPrivateKey).pow(secondPrivateNumber)
        ).mod(primeNumber);

        $(".body table tbody tr td .primeValue .content").text(primeNumber);
        $(".body table tbody tr td .groupValue .content").text(groupNumber);
        $(".body.active table tbody tr td .privateValue .content").text(
        thisPrivateNumber
        );
        $(".body:not(.active) table tbody tr td .privateValue .content").text(
        secondPrivateNumber
        );
        $(".body.active table tbody tr td .privateKey .content").text(
        firstPrivateKey
        );
        $(".body:not(.active) table tbody tr td .privateKey .content").text(
        secondPrivateKey
        );
        $(".body.active table tbody tr td .publicKey .content").text(
        firstPublicKey
        );
        $(".body:not(.active) table tbody tr td .publicKey .content").text(
        secondPublicKey
        );

        $(".body.active").removeClass("active");
        $(".waiting").fadeOut();
    });
    $(".waiting").css("display", "flex");
  });
});
