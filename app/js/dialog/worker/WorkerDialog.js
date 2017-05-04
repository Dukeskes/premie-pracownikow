/**
 * Created by BartDukes on 03.05.2017.
 */
angular.module(APP_ID).service('workerDialog', ['$uibModal', 'alert', 'spinner', 'workerService',
	function($uibModal, alert, spinner, workerService) {
		var _modal = null;

		this.show = function(afterSave, workerId) {
			_modal = $uibModal.open({
				templateUrl: 'template/util/dialog/worker/workerDialogView.html',
				controllerAs: 'vm',
				controller: [function() {
					var vm = this;

					vm.SpinnerKey = {
						WHOLE_MODAL: "WHOLE_MODAL",
						SAVE_BUTTON: "SAVE_BUTTON",
						LOADING_ITEMS: "LOADING_ITEMS"
					};
					vm.showErrors = false;
					vm.worker = null;
					vm.isEdit = Optional.isDefined(workerId);

					vm.save = _save;
					vm.close = _close;

					(function _init() {
						if (Optional.isDefined(workerId)) {
							workerService.fetchEntry(workerId).then(function(data) {
								vm.worker = data;
							});
						}
					})();

					function _save(isInvalid) {
						vm.showErrors = true;
						if (!isInvalid) {
							spinner.start(vm.SpinnerKey.SAVE_BUTTON);
							if (Optional.isDefined(workerId)) {
								workerService.update(vm.worker).then(_onSuccess, _onError);
							} else {
								workerService.create(vm.worker).then(_onSuccess, _onError);
							}
						}
					}

					function _onSuccess() {
						console.log(Optional.isDefined(afterSave));
						if (Optional.isDefined(afterSave)) {
							afterSave();
						}
						_close();
						alert.success("Pomyślnie zaktualizowano tabelę pracowników");
						spinner.stop(vm.SpinnerKey.SAVE_BUTTON);
					}
					
					function _onError(errorCode) {
						alert.error("Błąd przy zapiszu");
						spinner.stop(vm.SpinnerKey.SAVE_BUTTON);
					}

					function _close() {
						_modal.close();
					}
				}]
			});
		};

		this.close = function() {
			if (Optional.isDefined(_modal)) {
				_modal.close();
			}
		};
	}]);