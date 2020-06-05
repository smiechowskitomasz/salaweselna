$(function() {
  var $inputs = $("form input[required], form textarea[required]");

  var displayFieldError = function($elem) {
    var $fieldRow = $elem.closest(".form-row");
    var $fieldError = $fieldRow.find(".field-error");
    if (!$fieldError.length) {
      var errorText = $elem.attr("data-error");
      var $divError = $('<div class="field-error">' + errorText + "</div>");
      $fieldRow.append($divError);
    }
  };

  var hideFieldError = function($elem) {
    var $fieldRow = $elem.closest(".form-row");
    var $fieldError = $fieldRow.find(".field-error");
    if ($fieldError.length) {
      $fieldError.remove();
    }
  };

  $inputs.on("input", function() {
    var $elem = $(this);
    if (!$elem.get(0).checkValidity()) {
      $elem.addClass("error");
    } else {
      $elem.removeClass("error");
      hideFieldError($elem);
    }
  });

  var checkFieldsErrors = function() {
    //ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
    //jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
    var fieldsAreValid = true;
    $inputs.each(function(i, elem) {
      var $elem = $(elem);
      //if (new RegExp(pattern).test($elem.val())) {
      if (elem.checkValidity()) {
        hideFieldError($elem);
        $elem.removeClass("error");
      } else {
        displayFieldError($elem);
        $elem.addClass("error");
        fieldsAreValid = false;
      }
    });
    return fieldsAreValid;
  };

  $(".form").on("submit", function(e) {
    var $form = $(this);

    if (checkFieldsErrors()) {
      var dataToSend = $form.serializeArray();
      dataToSend = dataToSend.concat(
        $form
          .map(function() {
            return { name: this.name, value: this.value };
          })
          .get()
      );
    } else {
      e.preventDefault();
    }
  });
});
