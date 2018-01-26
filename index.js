(function() {
  if(typeof document !== 'undefined') {
  document.hotkeyModule = {
    registeredHotkeys: {},
    _availableModifiers: {
      shift: 'shift',
      alt: 'alt',
      meta: 'meta',
      ctrl: 'ctrl',
    },
    createHotkey: function(element, keyString, handler) {
      const sortedKey = keyString.split('+').sort().join('+').toLowerCase();
      if(!this.registeredHotkeys[sortedKey]) {
        this.registeredHotkeys[sortedKey] = (e) => handler(e);
        document.onkeypress = this._universalHandler.bind(this);
        return 0;
      }
      console.error('hotkey already binded');
      
    },
    _universalHandler: function(e) {
      let pressedCombination = "";
      for(let key in this._availableModifiers) {
        if(e[`${this._availableModifiers[key]}Key`]) 
          pressedCombination = pressedCombination === '' ? key : pressedCombination + '+' + key;
      }
      pressedCombination = pressedCombination === "" ? e.key : pressedCombination + '+' + e.key.toLowerCase();
      const sortedCombination = pressedCombination.split('+').sort().join('+');
      return this.registeredHotkeys[sortedCombination] && this.registeredHotkeys[sortedCombination](e);
    },
}
return 0;
  }
  console.error('should run the hotkeys module in a browser');
  return null;
})();
