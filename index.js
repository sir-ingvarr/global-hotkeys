(function() {
  if(!document) console.error('should run the hotkeys module in a browser');
  document.hotkeyModule = {
    options: {
      debug: false,
      autoRewrite: false,
    },
    registeredHotkeys: {},
    _availableModifiers: {
      Shift: 'shift',
      Alt: 'alt',
      Meta: 'meta',
      Control: 'ctrl',
    },
    _pressedCombination: [],
    _lastKey: '',
    createHotkey: function(combination, handler, args = [], context = window) {
      const keysArr = Array.isArray(combination) ? combination : combination.split('+');
      if(!keysArr.length) throw 'hotkey should contain at least 1 key';
      const combinationKey = keysArr.sort().join('+').toLowerCase();
      if(this.registeredHotkeys[combinationKey] && this.options.autoRewrite) throw 'hotkey already binded';
      this.registeredHotkeys[combinationKey] = handler.bind(context, ...args);
      if(!this.options.debug) return;
      console.info('registered', combinationKey, 'hotkey');
    },
    _universalPressHandler: function(e) {
      e.preventDefault();
      e.stopPropagation();
      const key = this._availableModifiers[e.key] || e.key;
      if(this._lastKey === key) return;
      this._lastKey = key;
      this._pressedCombination = [].concat(this._pressedCombination, [key]).sort();
      const combinationKey = this._pressedCombination.join('+').toLowerCase();
      if(this.options.debug) console.info('pressed', combinationKey, 'last key', this._lastKey);
      return this.registeredHotkeys[combinationKey] && this.registeredHotkeys[combinationKey]();
    },
    _releaseHandler: function (e) {
      this._lastKey = '';
      const key = this._availableModifiers[e.key] || e.key;
      /* hack to fix the issue with the meta key preventing keyup from being fired after meta key
       thanks Luxocrates for his answer on https://stackoverflow.com/a/61294448/11045046 */
      if(key === 'meta') this._pressedCombination = [];
      else this._pressedCombination = this._pressedCombination.filter(val => val !== key).sort();
      if(!this.options.debug) return;
      const combinationKey = this._pressedCombination.join('+').toLowerCase();
      console.info('release', key, 'current combination is', combinationKey);
    }
  }
  document.addEventListener('keydown', document.hotkeyModule._universalPressHandler.bind(document.hotkeyModule));
  document.addEventListener('keyup', document.hotkeyModule._releaseHandler.bind(document.hotkeyModule));

})();
