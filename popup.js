document.addEventListener('DOMContentLoaded', documentEvents, false);

function write_action(amt, cat, subCat, source, comments,location) {
  var data = [subCat.value, amt.value, source.value, cat.value, comments.value, location.value].join('|||'),
    xhttp = new XMLHttpRequest();
  document.getElementById("write").className = 'hidden';
  document.getElementById("loading").className = 'container-fluid popup-box show';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading").className = 'hidden';
      document.getElementById("write").className = 'container-fluid popup-box show';
      var result = this.responseText;
      document.getElementById("transForm").reset();
      alert("Successfully Added" + data.split('|||'));
      read_action();
    }
  };
  xhttp.open("GET", "https://script.google.com/macros/s/AKfycbzp29Qzo_oLjAgi2UnhkRDl798lXFiU99Jy-aqXIuuE8NF0Ejlq/exec?row=" + data, true);
  xhttp.send();
}

function read_action() {
  var xhttp = new XMLHttpRequest();
  document.getElementById("write").className = 'hidden';
  document.getElementById("loading").className = 'container-fluid popup-box show';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading").className = 'hidden';
      document.getElementById("read").className = 'container-fluid popup-box show';
      var obj = this.responseText.split(',');
      var result = "<br>"
      obj.forEach(function(item, index) {
        if (item.indexOf('Credit') < 0) {
          result += '<p class="line-item item">' + item + '</p>'
        } else {
          result += '<p class="line-item item red">' + item + '</p>'
        }
      })
      document.getElementById("result").innerHTML = result;
      var items = document.getElementsByClassName('item');
      for(var i=0; i < items.length; i++) {
        items[i].addEventListener('click', function(){read_more(this.innerHTML.split(':')[0])})
      }
    }
  };
  xhttp.open("GET", "https://script.google.com/macros/s/AKfycbwiLibhxusQjgb4yl_3ue0_wY_NojiSRQI1KZOu7HZXMapFO2k/exec", true);
  xhttp.send();
}

function read_more(itemType){
  var xhttp = new XMLHttpRequest();
  document.getElementById("loading").className = 'container-fluid popup-box show';
  document.getElementById("read").className = 'hidden';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loading").className = 'hidden';
      document.getElementById("read").className = 'container-fluid popup-box show';
      var obj = this.responseText.split('|');
      var result = "<br>"
      obj.forEach(function(item, index) {
        splitted = item.split(',')
        result += '<a href="' + splitted[splitted.length-1] +'" target="_blank"><p class="line-item item">' + splitted.slice(0,5) + '</p></a>'
      })
      document.getElementById("result").innerHTML = result;
    }
  };
  xhttp.open("GET", "https://script.google.com/macros/s/AKfycbxJciM0VIMhzUiWCEAaCsFPjIDHM8cQbp95Qus7cSsAb2C-b5W3/exec?cat=" + itemType, true);
  xhttp.send();
}

function back_action() {
  document.getElementById("write").className = 'container-fluid popup-box show';
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
        location = document.getElementById('location'),
        comments = document.getElementById('comments');
        if(cat.value == "Misc."){
          subCat = document.getElementById('miscSubCategory')
        }
      write_action(amt, cat, subCat, source, comments, location);
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