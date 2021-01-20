var data = [
  {
    id: "1",
    name: "Name1",
    price:"",
    children: [
      {
        id: 1,
        name: "Child1",
        price:"",
        children: [
          {
            id: 1,
            name: "Child1_1",
            price: "price1",
          },
          {
            id: 2,
            name: "Child1_2",
            price: "price2",
          },
          {
            id: 3,
            name: "Child1_3",
            price: "price3",
          },
        ],
      },
      {
        id: 2,
        name: "Child2",
        price:"",
      },
    ],
  },
  {
    id: "2",
    name: "Name2",
    price:"",
  },
  {
    id: "3",
    name: "Name3",
    price:"",
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
    sorting:true,
    //editing:true,
    data: data,
    rowRenderer: function (item, itemIndex) {
      return createTreeViewRows(item, "children");
    },
    editRowRenderer: function(item, itemIndex) {
      var $tr = $('<tr class="jsgrid-row">');
      
      for(propName in item){
        if(Array.isArray(item[propName]))
          continue;

        var $td = $('<td class="jsgrid-cell">');
        $td.append($('<input type="text" class="form-control">').val(item[propName]));
        $tr.append($td);
      }  

      return $tr;
    },
    fields: [
      {
        //name: 'name',
        title: 'Id',
        //visible:false,
      },
      {
          //name: 'name',
          title: 'Name',
      },
      {
          //name: 'price',
          title: 'Price'
      }
    ],
  });
});

function createTreeViewRows(element, childPropName, level = 0) {
  // Ancestor
  var $tr = $('<tr class="jsgrid-row">');
  $tr.attr('data-level',level);

  if(level > 0)
    $tr.addClass('collapsed');

  //Append expander for the first column
  var $expander = $('<img class="expander">').attr(
    "src",
    "assets/images/right-arrow.svg"
  );

  if (element[childPropName] && element[childPropName].length > 0) {

    // Columns
    var propIndex = 0;
    for(propName in element){
      if(!Array.isArray(element[propName])){
        var $td = $('<td class="jsgrid-cell">');

        if(propIndex == 0){

          // Add space blocks
          for (var i = 0; i < level; i++) {
            var $spaceBlock = $('<span class="space-block">');
            $td.append($spaceBlock);
          }

          // Increase level for child rows
          level++;
      
          $td.append($expander);
          $td.append($("<span>").append(element[propName]));
          
          // Add the new column to the row
          $tr.append($td);
        }
        else{
          // Column price
          $td.append($("<span>").append(element[propName]));
          
          // Add the new column to the row
          $tr.append($td);
        }

        propIndex++;
      }
    }
    // Fetch child rows recursively
    for (var i = 0; i < element[childPropName].length; i++)
      $tr = $tr.add(createTreeViewRows(element[childPropName][i], childPropName, level));

    // Expander click event handler
    $expander.click(function(e){
      e.preventDefault();

      // Check if a row is expanded
      if($(this).hasClass('expanded')){
        // If expanded before, collapse rows
        $(this).removeClass('expanded');
        for(var i=1; i < $tr.length; i++){
          $($tr[i]).addClass('collapsed');
          $($tr[i]).find('.expander').removeClass('expanded');
        }  
      }
      else{
        // If not expanded before, expand rows
        $(this).addClass('expanded');
        for(var i=1; i < $tr.length; i++){
          if(level == $($tr[i]).attr('data-level'))
            $($tr[i]).removeClass('collapsed');
        }
      }
    });
  } else {
    // Hide expander for rows without children
    $expander.css("visibility", "hidden");

    // Columns
    var propIndex = 0;
    for(propName in element){
      if(!Array.isArray(element[propName])){
        var $td = $('<td class="jsgrid-cell">');
        if(propIndex == 0){
  
          // Add space blocks
          for (var i = 0; i < level; i++) {
            var $spaceBlock = $('<span class="space-block">');
            $td.append($spaceBlock);
          }
  
          // Increase level for child rows
          level++;
      
          $td.append($expander);
          $td.append($("<span>").append(element[propName]));
          
          // Add the new column to the row
          $tr.append($td);
        }
        else{
          // Column price
          $td.append($("<span>").append(element[propName]));
          
          // Add the new column to the row
          $tr.append($td);
        }
  
        propIndex++;
      }
    }  
  }

  return $tr;
}
