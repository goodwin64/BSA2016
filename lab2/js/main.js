;
$(document).ready(function() {
  var $goodsList = $("#goods-list");
  var $newGoods = $("#new-goods");
  var $clear = $("#clear-completed");
  var $toggleAll = $("#select-all");

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var AddListItem_prependString = "<li><input type='checkbox' class='toggle'/><span class='text'>";
  var AddListItem_appendString = "</span><button class='destroy'></button></li>";

  function addListItem() {
    if ($newGoods.val() == "") {
      $newGoods;
    } else {
      $goodsList.append(AddListItem_prependString + $newGoods.val() + AddListItem_appendString);
      $newGoods.val("");
    }
  }

  function deleteItem() {
    if (confirm("Delete this goods?")) {
      $(this).closest("li").remove();
    }
  }

  function clearCompleted() {
    if (confirm("Delete checked goods?")) {
      $goodsList.find(".toggle:checked").closest("li").remove();
    }
    $toggleAll.attr("checked", false);
    $("li").css("textDecoration", "none");
  }

  function completed() {
    if ($(this).parent().css("textDecoration") == "line-through") {
      $(this).parent().css("textDecoration", "none");
      $(this).parent().css("opacity", "1");
    } else {
      $(this).parent().css("textDecoration", "line-through");
      $(this).parent().css("opacity", "0.5");
    }
  }

  $(document).on("click", ".destroy", deleteItem);
  $(document).on("click", ".toggle", completed);
  $clear.click(clearCompleted);

  $newGoods.keyup(function(e) {
    if (e.keyCode === ENTER_KEY) {
      addListItem();
    }
  });

  $toggleAll.click(function() {
    $("input:checkbox").not(this).prop("checked", this.checked);
    if ($("li").css("textDecoration") == "line-through") {
      $("li").css("textDecoration", "none");
      $("li").parent().css("opacity", "1");
    } else {
      $("li").css('textDecoration', "line-through");
      $("li").parent().css("opacity", "0.5");
    }
  });

  $goodsList.on("dblclick", "span", function() {
    var el = $('<input type="text" class="in-edit-text"/>');
    el.data('initText', this.innerHTML);
    $(this).replaceWith(el);
    el.val(this.innerHTML).focus();
    $(this).find(".text").hide();
    $(this).find(".destroy").hide();
  });

  $goodsList.on("keyup", ".in-edit-text", (function(e) {
    var text = null;
    if (e.keyCode === ENTER_KEY) {
      text = $(this).val();
    } else if (e.keyCode === ESCAPE_KEY) {
      text = $(this).data('initText');
    }
    if (text != null) {
      $(this).replaceWith($("<span class='text'>" + text + "</span>"));
    }
  }));
});