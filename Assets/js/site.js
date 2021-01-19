var data = [{
    id:'1',
    name:'Name1',
    children:[
        {
            id:1,
            name: 'Child1',
            children: [
                {
                    id:1,
                    name:'Child1_1',
                    price:'price1'
                },
                {
                    id:1,
                    name:'Child1_2',
                    price:'price2'
                },
                {
                    id:1,
                    name:'Child1_3',
                    price:'price3'
                }],
        },
        {
            id:2,
            name: 'Child2',
            children: [
                {
                    id:1,
                    name:'Child2_1',
                    price:'price1'
                },
                {
                    id:1,
                    name:'Child2_2',
                    price:'price2'
                },
                {
                    id:1,
                    name:'Child2_3',
                    price:'price3'
                }],
        },
        {
            id:3,
            name: 'Child3',
        },],
},{
    id:'2',
    name:'Name2',
},{
    id:'3',
    name:'Name3',
}];

$(document).ready(function(){

    // Tree grid
    $('#treeGrid').jsGrid({
        width: '100%',
        //sorting:true,
        //editing:true,
        data: data,
        rowRenderer: function (item, itemIndex) {
            console.log(item);

            var $row = $('<tr style="width:100%">');
            var $row1 = $('<tr style="width:100%">');
            var $tr = $('<tr class="jsgrid-row">');
            var $expander = $('<img style="height:20px">').attr('src','assets/images/right-arrow.svg');
            var $tdExpander = $('<td class="jsgrid-cell">').append($expander);
            var $tdName = $('<td class="jsgrid-cell">').append('<span>').append(item.name);
            var $trChild = $('<tr class="jsgrid-row" style="">');

            var $spaceBlock = $('<span class="space-block">');



            if(item.children){
                var $tdChildName = $('<td class="jsgrid-cell">').append($spaceBlock).append($('<span>').append(item.children[0].name));
                $trChild.append($tdChildName);
            }
            

            // Expand column
            $expander.click(function(){
                
            });

            $tr.append($tdExpander).append($tdName)
            $row.append($tr).append($trChild);
            $row1.append($row).append($row);
            return $row1;
        },
        // editRowRenderer: function(item, itemIndex) {
        //     var $tr = $('<tr class="jsgrid-row text-danger">');
        //     var $tdExpander = $('<td class="jsgrid-cell">').append('+');
        //     var $tdName = $('<td class="jsgrid-cell">').append('<span>').append(item.name);

        //     return $tr.append($tdExpander).append($tdName);
        // },
        fields:[
            // {
            //     //name: 'name',
            //     title: 'Name', 
            // },
            // {
            //     //name: 'price',
            //     title: 'Price'
            // }
        ]
    });
});

function createRows(element, propName, level=0){
    // Ancestor
    var $tr = $('<tr class="jsgrid-row">');
    
    // Columns
    var $tdName = $('<td class="jsgrid-cell">').append($('<span>').append(element.name))
    var $tdPrice = $('<td class="jsgrid-cell">').append($('<span>').append(""))
    var $spaceBlock = $('<span class="space-block">');
    

    // Child rows
    if(element[propName] && element[propName].length > 0){
        level++;
        var $expander = $('<img style="height:20px">').attr('src','assets/images/right-arrow.svg');
        var $tdExpander = $('<td class="jsgrid-cell">').append($expander);

        $tr.append($tdName).append($tdPrice);

        for(var i = 0; i < element[propName].length; i ++){
            createChildrenRows(element[propName], propName, level)
        }
    }
    else{
        $tr.append($tdName).append($tdPrice);
    }

    return $tr;
}