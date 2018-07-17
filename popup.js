document.addEventListener('DOMContentLoaded', documentEvents, false);

function write_action(amt, cat, subCat, source, comments) {
  // TODO: Create google app script to write these values into transaction sheet
  console.log(amt.value, cat.value, subCat.value, source.value, comments.value);
}

function read_action() {
  var xhttp = new XMLHttpRequest();
  document.getElementById("write").className = 'hidden';
  document.getElementById("loading").className = 'show';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading").className = 'hidden';
      document.getElementById("read").className = 'show';
      var obj = this.responseText.split(',');
      var result = "<br>"
      obj.forEach(function(item, index) {
        if (item.indexOf('Credit') < 0) {
          result += '<p class="bg-success text-center">' + item + '</p>'
        } else {
          result += '<p class="bg-danger  text-center">' + item + '</p>'
        }
      })
      document.getElementById("result").innerHTML = result;
    }
  };
  xhttp.open("GET", "https://script.google.com/macros/s/AKfycbwiLibhxusQjgb4yl_3ue0_wY_NojiSRQI1KZOu7HZXMapFO2k/exec", true);
  xhttp.send();
}

function back_action() {
  document.getElementById("write").className = 'container-fluid show';
  document.getElementById("read").className = 'hidden';
}

function documentEvents() {
  document.getElementById('transForm').addEventListener('submit',
    function(e) {
      e.preventDefault();
      var amt = document.getElementById('amount'),
        cat = document.getElementById('category'),
        subCat = document.getElementById('subCategory'),
        source = document.getElementById('source'),
        comments = document.getElementById('comments');
        if(cat.value == "Misc."){
          subCat = document.getElementById('miscSubCategory')
        }
      write_action(amt, cat, subCat, source, comments);
    });
  document.getElementById('showBal').addEventListener('click',
    function() {
      read_action();
    });
  document.getElementById('back').addEventListener('click',
    function() {
      back_action();
    });
  document.getElementById('category').addEventListener('change',
    function() {
      var catObject = {
        "Food": {"Lunch": "Lunch", "Dinner": "Dinner"},
        "Shopping": {"Test1": "Test1", "Test2": "Test2"},
        "Travel": {"Test3": "Test3", "Test4": "Test4"}
      }
      var subCat = document.getElementById("subCategory");
      subCat.length = 1;
      if (this.selectedIndex < 1) return;
      if(this.value == 'Misc.') {
        document.getElementById("miscSubCatCon").className = 'form-group show';
        document.getElementById("subCatCon").className = 'hidden';
      } else {
        for (var subCategory in catObject[this.value]) {
          document.getElementById("miscSubCatCon").className = 'hidden';
          document.getElementById("subCatCon").className = 'form-group show';
          subCat.options[subCat.options.length] = new Option(subCategory, subCategory);
        }
      }
    });
}