sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,BaseController) {
        "use strict";

        return BaseController.extend("employee.overtime.controller.Main", {
            onInit: function () {
                var oLeaveRequestModel = new sap.ui.model.json.JSONModel({
                    LeaveRequestList: [],
                    SelectedRowRequest: []
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
                     // var oViewModel =  this.getView().getModel("LeaveRequestModel");
                      
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
                var oLeaveRequestModel = this.getModel("LeaveRequestModel");
                var oTable = this.getView().byId("mainTable");
                var sPath = oEvent.getParameter("listItem").getBindingContext("LeaveRequestModel").getPath();
                var selectedRow= oTable.getModel("LeaveRequestModel").getProperty(sPath);
                var oModel = this.getOwnerComponent().getModel();
                oViewModel.setProperty("/SelectedRow", selectedRow);
                var sPath2 = oModel.createKey("/OverTimeEmployeeSet", {
                  Pernr: oViewModel.getProperty("/SelectedRow/Pernr"), 
                   
                  });
                var a = 1;
                var that = this ;
                oModel.read(sPath2, {
                  urlParameters: {  
                   
                    $expand: "Request",
                      
                  },
                  success: function(oData, oResponse) {
                    
                      // Okuma başarılı olduğunda yapılacak işlemler
                       console.log("Veriler başarıyla okundu:", oData)
                      
                       oLeaveRequestModel.setProperty("/MasterDetail", oData.Request
                       );
                       
                       var OverTimeRequestSet = oViewModel.getProperty("/MasterDetail/results")
                       var selectedRow= oTable.getModel("LeaveRequestModel").getProperty(sPath);
                      // oPlanned.forEach((element) => {
                      //   if (element.LeaveStatus === "PAP" || element.LeaveStatus === "PRJ") {
                      //     element.LeaveStatus =  this.getText("Planned",[]);
                      //   // element.LeaveStatus = "Planlandı";
                      //     oApproveDialogModel.setProperty("/MasterDetail/results/LeaveStatus", element.LeaveStatus);
                      //   }
                      // });
                       // var PlannedStatus = oPlannedDay.LeaveType
        
                     //  if(PlannedDay = "PL"){
                     //   oApproveDialogModel.setProperty("/MasterDetail/Results/PlannedDay", "Planned")
                    //   }
                      
                    // console.log(oApproveDialogModel.getProperty("/MasterDetail"));
                   // oLeaveDialog.open();
                   //var OverTimeRequestSet = oData.Request.results;
                   for(var i = 0; i < OverTimeRequestSet.length; i++){
                    if(OverTimeRequestSet[i].Pernr === selectedRow.Pernr ){
                     oViewModel.setProperty("/SelectedRowRequest", oData.Request.results[i]
                   );
                  };
                  var oRequestDialog = this.getView().byId("RequestDialog");
                  oRequestDialog.open();
                }
                }.bind(this),
                  error: function(oError) {
                      // Okuma sırasında bir hata oluştuğunda yapılacak işlemler
                      console.log("Okuma hatası:", oError);
                  }
              
              });
              },
              onCloseDialog: function() {
                var oRequestDialog = this.getView().byId("RequestDialog");
                oRequestDialog.close();
              },
              onDialogAfterClose: function() {
               var oViewModel =  this.getView().getModel("LeaveRequestModel");
                oViewModel.setProperty("/SelectedRowRequest", []
              );
              }
        
        });
    });
