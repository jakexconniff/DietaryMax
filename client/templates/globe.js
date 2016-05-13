globe = {
  applyEdits: function(swapEdit) {
    console.log(swapEdit % 2);
    termsEdit = document.getElementsByClassName("termsedit");
    liquidEdit = document.getElementsByClassName("liquidedit");
    hotBevEdit = document.getElementsByClassName("hotbevedit");
    coldBevEdit = document.getElementsByClassName("coldbevedit");
    glyphRemove = document.getElementsByClassName("glyphicon-remove");
    glyphAdd = document.getElementsByClassName("glyphicon-plus");
    termsInitial = document.getElementsByClassName("restrictionsListInitial");
    termsSecondary = document.getElementsByClassName("restrictionsListSecondary");
    residentCardSize = document.getElementsByClassName("resident-card");
    console.log(liquidEdit.length);

    if (swapEdit > 0) {
      console.log(termsInitial);
      console.log(termsSecondary);
      console.log(swapEdit);
      for (var i=0; i<termsInitial.length; i++) {
        termsInitial[i].className = "restrictionsListInitial hidden";
      }
      for (var i=0; i<termsSecondary.length; i++) {
        termsSecondary[i].className = "restrictionsListSecondary shown";
      }
    }

    if (swapEdit % 2 == 0) {
      for (var i=0; i<residentCardSize.length; i++) {
        residentCardSize[i].className = "resident-card small-box col-xs-12 col-md-6 col-md-offset-3";
      }

      for (var i=0; i<hotBevEdit.length; i++) {
        hotBevEdit[i].className = "hotbevedit hidden";
      }
      for (var i=0; i<coldBevEdit.length; i++) {
        coldBevEdit[i].className = "coldbevedit hidden";
      }
      for (var i=0; i<termsEdit.length; i++) {
        termsEdit[i].className = "termsedit hidden";
      }
      for (var i=0; i<glyphRemove.length; i++) {
        console.log("tick" + i);
        glyphRemove[i].className = "red glyphicon glyphicon-remove hidden";
      }
      for (var i=0; i<glyphAdd.length; i++) {
        glyphAdd[i].className = "green glyphicon glyphicon-plus hidden";
      }
      for (var i=0; i<liquidEdit.length; i++) {
        liquidEdit[i].className = "liquidedit hidden";
      }
    }
    if (swapEdit % 2 == 1) {
      for (var i=0; i<residentCardSize.length; i++) {
        residentCardSize[i].className = "resident-card big-box col-xs-12 col-md-6 col-md-offset-3";
      }

      for (var i=0; i<hotBevEdit.length; i++) {
        hotBevEdit[i].className = "hotbevedit shown";
      }
      for (var i=0; i<coldBevEdit.length; i++) {
        coldBevEdit[i].className = "coldbevedit shown";
      }
      for (var i=0; i<termsEdit.length; i++) {
        termsEdit[i].className = "termsedit shown";
      }
      for (var i=0; i<glyphRemove.length; i++) {
        console.log("tock" + i);
        glyphRemove[i].className = "red glyphicon glyphicon-remove shown";
      }
      for (var i=0; i<glyphAdd.length; i++) {
        glyphAdd[i].className = "green glyphicon glyphicon-plus shown";
      }
      for (var i=0; i<liquidEdit.length; i++) {
        liquidEdit[i].className = "liquidedit shown";
      }
    }


  }
}
