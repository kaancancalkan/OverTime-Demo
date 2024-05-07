sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("employee.overtime.controller.Main", {
            onInit: function () {
                var oLeaveRequestModel = new sap.ui.model.json.JSONModel({
                    LeaveRequestList: []
                });
              
                this.getOwnerComponent().setModel(oLeaveRequestModel, "LeaveRequestModel");
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/OverTimeEmployeeSet", {
                    success: function (oData, oResponse) {
                      var index = 1;
                      oData.results.forEach((element) => {
                        element["id"] = index;
                        index++;
                        // console.log(oModel)
                        // console.log(oData)
                      });
                      
                      oLeaveRequestModel.setProperty("/LeaveRequestList", oData.results);
                    //   var ApprovalStatus = oApproveModel.getProperty(
                    //     "/ApprovalSet/0/ApprovelStatus"
                    //   );
                    //   if (ApprovalStatus == null || ApprovalStatus == "") {
                    //     oApproveModel.setProperty(
                    //       "/ApprovalSet/0/ApprovelStatus",
                    //       "Onay Bekleniyor"
                    //     );
                    //   }
                      var a = 0;
                    },
                    error: function (oError) {
                      console.log(oError);
                    },
                  }); 

            },
            
              onTableItemPress: function (oEvent) {
                console.log("a");

                var oViewModel =  this.getView().getModel("LeaveRequestModel"); 
                var oTable = this.getView().byId("mainTable");
               // var sPath = oEvent.getParameter("listItem").getBindingContext("LeaveRequestModel").getPath();
                var selectedRow= oTable.getModel("LeaveRequestModel").getProperty(sPath);
                var oModel = this.getOwnerComponent().getModel();
                oViewModel.setProperty("/SelectedRow", selectedRow);
                var sPath = oModel.createKey("/LeaveRequestSet", {
                  Pern: oViewModel.getProperty("/SelectedRow/PlanId"), 
                   
                  });
                var a = 1;
              },

        
        });
    });
