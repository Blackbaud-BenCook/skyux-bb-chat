(function () {
    'use strict';

    function chatProvider() {
        var provider = this;
        var _config = {};

        var DEFAULTS = {
            baseUrl: 'https://host.nxt.blackbaud.com/bb-chat-otg/'
        };

        provider.configure = configure;
        provider.$get = get;

        function configure(config) {
            config = config || {};
            _config = angular.extend(_config, DEFAULTS, config);
        }

        function get($document, $rootScope, $compile) {
            var service = {};

            initialize();

            return service;

            function initialize() {
                var scope = $rootScope.$new(true);
                scope.chatUrl = _config.baseUrl;
                var el = $compile('<bb-chat-window></bb-chat-window>')(scope);

                $document.find('body').append(el);
            }
        }

        get.$inject = ['$document', '$rootScope', '$compile'];
    }

    chatProvider.$inject = [];

    function ChatWindowController($scope, $element) {
        var vm = this;

        vm.chatUrl = $scope.chatUrl;
        vm.toggleDisplay = toggleDisplay;

        function toggleDisplay() {
            $element.parent().toggleClass('closed');
        }
    }

    ChatWindowController.$inject = ['$scope', '$element'];

    function chatWindow() {
        var directive = {
            bindToController: true,
            controller: ChatWindowController,
            controllerAs: 'vm',
            restrict: 'E',
            template:
                '<div class="bb-chat-container closed">' +
                '  <div class="bb-chat-invoker title="Chat" ng-click="vm.toggleDisplay()"><i class="fa fa-weixin"></i>' +
                '  </div>' +
                '  <div class="bb-chat-panel">' +
                '    <iframe ng-src="{{vm.chatUrl}}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>' +
                '  </div>' +
                '</div>'
        };

        return directive;
    }

    chatWindow.$inject = [];

    angular.module('sky.chat', [])
        .provider('bbChat', chatProvider)
        .directive('bbChatWindow', chatWindow);

}());
