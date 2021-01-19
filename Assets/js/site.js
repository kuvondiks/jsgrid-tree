var data = [
  {
    id: "1",
    name: "Name1",
    children: [
      {
        id: 1,
        name: "Child1",
        children: [
          {
            id: 1,
            name: "Child1_1",
            price: "price1",
            children: [
              {
                id: 1,
                name: "Child1_1",
                price: "price1",
              },
              {
                id: 1,
                name: "Child1_2",
                price: "price2",
              },
              {
                id: 1,
                name: "Child1_3",
                price: "price3",
              },]
          },
          {
            id: 1,
            name: "Child1_2",
            price: "price2",
          },
          {
            id: 1,
            name: "Child1_3",
            price: "price3",
          },
        ],
      },
      {
        id: 2,
        name: "Child2",
        children: [],
      },
    ],
  },
  {
    id: "2",
    name: "Name2",
  },
  {
    id: "3",
    name: "Name3",
    children: [
      {
        id: 1,
        name: "Child1",
        price: "price1",
      },
      {
        id: 2,
        name: "Child2",
        price: "price2",
      },
      {
        id: 3,
        name: "Child3",
        price: "price3",
      },
    ],
  },
];

$(document).ready(function () {
  // Tree grid
  $("#treeGrid").jsGrid({
    width: "100%",
    //sorting:true,
    //editing:true,
    data: data,
    rowRenderer: function (item, itemIndex) {
      return createRows(item, "children");
      // var $tr1 = $('<tr class="jsgrid-row">');
      // var $td11 = $('<td class="jsgrid-cell">');
      // var $td12 = $('<td class="jsgrid-cell">');
      // $tr1.append($td11);
      // $tr1.append($td12);

      // var $tr2 = $('<tr class="jsgrid-row">');
      // var $td21 = $('<td class="jsgrid-cell">');
      // var $td22 = $('<td class="jsgrid-cell">');
      // $tr2.append($td21);
      // $tr2.append($td22);

      // $tr1 = $tr1.add($tr2);

      // return $tr1;
    },
    // editRowRenderer: function(item, itemIndex) {
    //     var $tr = $('<tr class="jsgrid-row text-danger">');
    //     var $tdExpander = $('<td class="jsgrid-cell">').append('+');
    //     var $tdName = $('<td class="jsgrid-cell">').append('<span>').append(item.name);

    //     return $tr.append($tdExpander).append($tdName);
    // },
    fields: [
      // {
      //     //name: 'name',
      //     title: 'Name',
      // },
      // {
      //     //name: 'price',
      //     title: 'Price'
      // }
    ],
  });
});

function createRows(element, propName, level = 0) {
  // Ancestor
  var $tr = $('<tr class="jsgrid-row">');
  $tr.attr('data-level',level);

  if(level > 0)
    $tr.addClass('collapse');

  //Append expander for the first column
  var $expander = $('<img class="expander">').attr(
    "src",
    "assets/images/right-arrow.svg"
  );

  // Child rows
  if (element[propName] && element[propName].length > 0) {
    // Column name
    var $tdName = $('<td class="jsgrid-cell">');

    // Add space blocks
    for (var i = 0; i < level; i++) {
      var $spaceBlock = $('<span class="space-block">');
      $tdName.append($spaceBlock);
    }

    level++;

    $tdName.append($expander);
    $tdName.append($("<span>").append(element.name));

    // Column price
    var $tdPrice = $('<td class="jsgrid-cell">');
    $tdPrice.append($("<span>").append(element.price));

    $tr.append($tdName).append($tdPrice);

    var $childRows;
    for (var i = 0; i < element[propName].length; i++) {
      $childRows = createRows(element[propName][i], propName, level);
      $tr = $tr.add($childRows);
    }

    $expander.click(function(){
      if($(this).hasClass('expanded')){
        $(this).removeClass('expanded');
        for(var i=1; i < $tr.length; i++){
          $($tr[i]).addClass('collapse');
          $($tr[i]).find('.expander').removeClass('expanded');
        }  
      }
      else{
        $(this).addClass('expanded');
        for(var i=1; i < $tr.length; i++){
          if(level == $($tr[i]).attr('data-level'))
            $($tr[i]).removeClass('collapse');
        }
      }
    });
  } else {
    // Hide expander for rows without children
    $expander.css("visibility", "hidden");

    // Column name
    var $tdName = $('<td class="jsgrid-cell">');

    // Add space blocks
    for (var i = 0; i < level; i++) {
      var $spaceBlock = $('<span class="space-block">');
      $tdName.append($spaceBlock);
    }

    $tdName.append($expander);
    $tdName.append($("<span>").append(element.name));

    // Column price
    var $tdPrice = $('<td class="jsgrid-cell">');
    $tdPrice.append($("<span>").append(element.price));

    $tr.append($tdName).append($tdPrice);
  }

  return $tr;
}
