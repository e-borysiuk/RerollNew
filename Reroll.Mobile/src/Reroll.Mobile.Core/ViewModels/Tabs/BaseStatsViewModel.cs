using System;
using System.Collections.Generic;
using MvvmCross.Base;
using MvvmCross.Commands;
using MvvmCross.Plugin.Messenger;
using Reroll.Mobile.Core.Models.MvxMessages;
using Reroll.Models;
using Reroll.Models.Enums;

namespace Reroll.Mobile.Core.ViewModels.Tabs
{
    public class BaseStatsViewModel : ChildViewModel
    {
        public BaseStatsViewModel(string name = "1") : base(name)
        {
        }

        private IMvxCommand _goToChildCommand;
        private IMvxCommand _incrementValueCommand;
        private IMvxCommand _decrementValueCommand;
        private readonly MvxSubscriptionToken _messageToken;

        public IMvxCommand GoToChildCommand
        {
            get
            {
                _goToChildCommand = _goToChildCommand ?? new MvxCommand(() =>
                {
                    
                });
                return _goToChildCommand;
            }
        }

        public IMvxCommand IncrementValueCommand
        {
            get
            {
                _incrementValueCommand = _incrementValueCommand ?? new MvxCommand(() =>
                {
                    PlayerModel newValue = PlayerModel;
                    newValue.Charisma++;
                    this._dataRepository.SendUpdate(newValue);
                });
                return _incrementValueCommand;
            }
        }

        public IMvxCommand DecrementValueCommand
        {
            get
            {
                _decrementValueCommand = _decrementValueCommand ?? new MvxCommand(() =>
                {
                    PlayerModel newValue = PlayerModel;
                    newValue.Charisma--;
                    this._dataRepository.SendUpdate(newValue);
                });
                return _decrementValueCommand;
            }
        }

        
    }
}