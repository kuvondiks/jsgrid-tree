var data = [
  {
    id: "1",
    name: "Name1",
    price:null,
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
    price:null,
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
    //sorting:true,
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
    rowClick: function(args){
      var $tr = $(args.event.currentTarget);
      
      if($tr.attr('data-level') == 2){
        editingOn($tr);
      }
    },
    fields: [
      {
        //name: 'name',
        title: 'Id',
        visible:false,
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

// Creates rows with sub rows
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
        if(propName == "id"){
          $td.append($("<span>").append(element[propName]));
          $td.css('display','none');
          $tr.append($td)
          continue;
        }

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
        if(propName == "id"){
          $td.append($("<span>").append(element[propName]));
          $td.css('display','none');
          $tr.append($td)
          continue;
        }

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

// Creates editing container
function createEditContainer(value){
  var $div = $('<div class="d-flex">');
  var $input = $('<input class="form-control edit-input">');
  $($input).val(value);

  var $submitBtn = $('<button class="btn btn-primary edit-buttons">');
  $submitBtn.append($('<i>').addClass('fa fa-check'));
  
  var $cancelBtn = $('<button class="btn btn-danger edit-buttons">');
  $cancelBtn.append($('<i>').addClass('fa fa-close'));

  // Cancel button click event handler
  $cancelBtn.click(function(e){
    e.preventDefault();
    editingOff(currEditingTr, oldVal);

    e.stopPropagation();
  });

   // Submit button click event handler
   $submitBtn.click(function(e){
    e.preventDefault();
    
    // Ajax request
    // ...
    
    editingOff(currEditingTr);
    
    e.stopPropagation();
  });


  $div.append($input);
  $div.append($submitBtn);
  $div.append($cancelBtn);

  return $div;
}

// Current editing row
var currEditingTr = null;
var oldVal = null;

// Turns off edit mode on a row
function editingOn(tr){
  // Checks the current editing row
  if(currEditingTr && !currEditingTr.is(tr))
    // Turns off edting mode for a current editing row
    editingOff(currEditingTr, oldVal);

  // Renew current editing row
  currEditingTr = tr;

  // If a row is not on edit mode...
  if(!tr.hasClass('editing')){
    tr.addClass('editing');

    // Gets columns of the row
    var $tdArr = $(tr).find('td');

    // We need third column to edit
    var $targetTd = $($tdArr[2]);
    
    // Find the target column of value
    var $spanArr = $($targetTd.find('span'));
    var value = $($spanArr[0]).text();
    
    oldVal = value;
    
    // Clear value to show
    $spanArr.remove();
    
    // Append edit container for the column
    $targetTd.append(createEditContainer(value));
  }
}

// Turns on edit mode on a row
function editingOff(tr, val){
  if(tr.hasClass('editing')){
    tr.removeClass('editing');

    // Gets columns of the row
    var $tdArr = $(tr).find('td');

    // We need third column
    var $targetTd = $($tdArr[2]);

    // Find the edited column of value
    var $divArr = $($targetTd.find('div'));
    var $inputArr = $($targetTd.find('input'));
    var value = $($inputArr[0]).val();

    // Clear edit container
    $divArr.remove();
    
    // Append value to show for the column
    if(val && val != "")
      $targetTd.append($('<span>').text(val));
    else
      $targetTd.append($('<span>').text(value));
  }
}