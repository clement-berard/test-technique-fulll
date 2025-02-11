Feature: Register a vehicle

  Scenario: I can register a vehicle
    Given my fleet
    And a vehicle
    When I register this vehicle into my fleet
    Then this vehicle should be part of my vehicle fleet

  Scenario: I can't register same vehicle twice
    Given my fleet
    And a vehicle
    And I have registered this vehicle into my fleet
    When I try to register this vehicle into my fleet
    Then I should be informed this this vehicle has already been registered into my fleet
