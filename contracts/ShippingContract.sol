// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract ShippingContract {
    address public supplier;
    address public customer;
    uint256 public paymentAmount;
    bool public paymentReceived;
    bool public shipmentReady;

    constructor(address _customer, uint256 _paymentAmount) {
        supplier = msg.sender; // Supplier is the contract deployer
        customer = _customer;
        paymentAmount = _paymentAmount;
        paymentReceived = false;
        shipmentReady = false;
    }

    // Function to receive payment
    function receivePayment() external payable {
        require(msg.sender == customer, "Only the customer can make the payment");
        require(msg.value == paymentAmount, "Incorrect payment amount");

        paymentReceived = true;
    }

    // Function to check payment and prepare shipment
    function prepareShipment() external {
        require(msg.sender == supplier, "Only the supplier can prepare the shipment");
        require(paymentReceived, "Payment has not been received");

        shipmentReady = true;
    }

    // Function to hold shipment if payment is not received
    function holdShipment() external {
        require(msg.sender == supplier, "Only the supplier can hold the shipment");
        require(!paymentReceived, "Payment has been received, cannot hold shipment");

        shipmentReady = false;
    }

    // Function to withdraw payment by supplier
    function withdrawPayment() external {
        require(msg.sender == supplier, "Only the supplier can withdraw the payment");
        require(paymentReceived, "Payment has not been received");

        payable(supplier).transfer(paymentAmount);
    }
}
