(function(global){
    var PostAdViewModel,
    	app = global.app = global.app || {};
    
    PostAdViewModel = kendo.data.ObservableObject.extend({
        
        show:function(){
            
            //for city dropdownlist
            $("#city").kendoDropDownList({
                optionLabel: "Select City",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Agra", id: 1 },
                    { name: "Aligarh", id: 2 },
                	{ name: "Bhopal", id: 3 },
                    { name: "Hyderabad", id: 4 }
                    ],
                index:0,
                select:function(e){
                   // var index = e.item.index();
                    app.postadService.viewModel.localityListView();
                }
            });
           
            
            //validation for postad 1st form
            $("#postadfrm1").validate({
                rules:{
                    adtitle:{
                        required:true,
                        minlength:4
                    },
                    AdDescription:{
                        required:true,
                        minlength:8
                    },
                    city:{
                        index:true
                    }
                },
                messages:{
                    adtitle:{
                        required:"Please Enter Ad Title."
                    },
                    AdDescription:{
                        required:"Please Enter Ad Description."
                    },
                    city:{
                        required:"ok"
                    }
                },
                submitHandler:function(form){
                    return false;
                }
            });
            
           
        },
        localityListView:function(data){
          //  var index = data;
             $("#locality").kendoDropDownList({
                optionLabel: "Choose Locality",
                cascadeFrom: "city",
                cascadeFromField: "parentId",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Saaket", id: 1, parentId: 1 },
                    { name: "Center Point", id: 2, parentId: 2 },
                    { name: "Kolar road", id: 3, parentId: 3 },
                    { name: "Krishna nagar", id: 4, parentId: 4 }
                ]
            });
        },
        validationField:function(){
             var dropdownlist = $("#city").data("kendoDropDownList");
            alert(dropdownlist.select());
        },
            
       
        postadSubmitFirst:function(){
            
          var status= $("#postadfrm1").valid();
            
            if(status === false)
            {
                return false;
            }
            else
            {
               // apps.navigate("#postad2");
               // app.postadService.viewModel.validationField();
               
            }
       }
           
    });
    
    app.postadService = {
      viewModel : new PostAdViewModel()  
    };
})(window);