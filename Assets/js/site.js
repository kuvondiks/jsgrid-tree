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
        children: [
          {
            id: 1,
            name: "Child2_1",
            price: "price1",
          },
          {
            id: 1,
            name: "Child2_2",
            price: "price2",
          },
          {
            id: 1,
            name: "Child2_3",
            price: "price3",
          },
        ],
      },
      {
        id: 3,
        name: "Child3",
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
        return createRows(item, 'children');
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

  //Append expander for the first column
  var $expander = $('<img class="expander">').attr(
    "src",
    "assets/images/right-arrow.svg"
  );

  // Child rows
  if (element[propName] && element[propName].length > 0) {
    // Columns
    var $tdName = $('<td class="jsgrid-cell">');
    
    // Add space blocks
    var $spaceBlock = $('<span class="space-block">');
    for(var i=0; i < level; i++){
        $tdName.append($spaceBlock);
    }
    
    level++;
    
    $tdName.append($expander);
    $tdName.append($("<span>").append(element.name));

    var $tdPrice = $('<td class="jsgrid-cell">');
    $tdPrice.append($("<span>").append(element.price));

    $tr.append($tdName).append($tdPrice);

    for (var i = 0; i < element[propName].length; i++) {
      $tr.append(createRows(element[propName][i], propName, level));
    }

  } else {
    // Hide expander for rows without children
    $expander.css('visibility', 'hidden');

    // Columns
    var $tdName = $('<td class="jsgrid-cell">');
    $tdName.append($expander);
    $tdName.append($("<span>").append(element.name));

    var $tdPrice = $('<td class="jsgrid-cell">');
    $tdPrice.append($("<span>").append(element.price));

    $tr.append($tdName).append($tdPrice);
  }

  return $tr;
}
