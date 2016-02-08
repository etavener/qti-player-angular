angular.module("contentplayer")
  .service('interfaceEvents', function () {
  return  {
    saveResponses: 'interface::saveResponses'
  };
  
})
.service('assessmentEvents', function () {
  return  {
    setResponse: 'assessment::setResponse',
  };
  
})
.service('matchinteractionEvents', function () {
  return  {
    update: 'matchinteraction::update'
  };
})
.service('simplematchsetEvents', function () {
  return  {
    update: 'simplematchset::update'
  };
})
.service('sacEvents', function () {
  return  {
    select: 'sac::select',
    deselect: 'sac::deselect'
  };
})
.service('hottextinteractionEvents', function () {
  return  {
    update: 'hottextinteraction::update'
  };  
})
.service('hottextEvents', function () {
  return  {
    select: 'hottext::select'
  };
})
.service('choiceinteractionEvents', function () {
  return  {
    update: 'choiceinteraction::update'
  };
})
.service('simplechoiceEvents', function () {
  return  {
    select: 'simplechoice::select'
  };
});