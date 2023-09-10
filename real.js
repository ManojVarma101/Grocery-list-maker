var selectedItems = [];

$("input[type='checkbox']").on('change', function () {
    var text = $(this).next('label').text().trim();
    var checkboxId = $(this).attr('id');
    var number = checkboxId.replace('v', '');
    var quantity = $("select[name='number" + number + "']").val();
    
    if ($(this).prop("checked")) {
        selectedItems.push({ name: text, quantity: quantity });
    } else {
        var index = selectedItems.findIndex(item => item.name === text);
        if (index !== -1) {
            selectedItems.splice(index, 1);
        }
    }
    console.log(selectedItems);
});

$("select[name^='number']").on('change', function () {
    var dropdownName = $(this).attr('name');
    var number = dropdownName.replace('number', '');
    var text = $("label[for='v" + number + "']").text().trim();
    var quantity = $(this).val();
    var index = selectedItems.findIndex(item => item.name === text);
    if (index !== -1) {
        selectedItems[index].quantity = quantity;
    }

    console.log(selectedItems);
});

$("#submit").click(function () {
    var selected = selectedItems.map(item => item.name + " (" + item.quantity + " kgs)").join(', ');
    window.location.href = "result.html?selected=" + selected;
    
});
var selected = new URLSearchParams(window.location.search).get('selected');

//converting string selected to array result

var selectedArray = [];

if (selected) {
    selectedArray = selected.split(', ').map(item => {
        var parts = item.split(' (');
        // Remove the extra brace from the quantity
        var quantity = parts[1] ? parts[1].replace(')', '') : '';
        return {
            name: parts[0],
            quantity: quantity
        };
    });
}

console.log(selectedArray);

var tbody = document.getElementById('table-body');

if (tbody) {
    selectedArray.forEach(item => {
        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        var quantityCell = document.createElement('td');

        nameCell.textContent = item.name;
        quantityCell.textContent = item.quantity;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        tbody.appendChild(row);
    });
} else {
    console.error("Table body element with id 'table-body' not found.");
}
