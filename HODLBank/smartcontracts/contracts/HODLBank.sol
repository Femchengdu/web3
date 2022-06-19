// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract HODLBank {
    // Hodl bank object
    struct Hodler {
        uint256 hodlEndTime; // when the hodl is expected to end
        address hodlerAddress; // person sending the money
        uint256 hodlAmount; // Amount to hodl
        bool redeemed; // Initially set to false
    }

    Hodler[] private hodlerList;

    address public hodlBank; // Eth address to save the funds
    uint256 public hodlBankBalance; // Public Eth balance

    // Log Information
    event Hodl(
        uint256 hodlBankBalance,
        address to,
        address from,
        uint256 value,
        uint256 endTime
    );

    event RedeemHodl(
        uint256 hodlBankBalance,
        address to,
        address from,
        uint256 value,
        uint256 endTime
    );

    event payoutReceiver(address payoutReceiver);

    // Init the HodlBank
    constructor() {
        hodlBank = msg.sender;
    }

    function hodl(uint256 _hodlDuration) public payable {
        require(msg.value > 30, "Hodl amount cannot be less than 30!");
        require(msg.sender != hodlBank, "Hodlbank cannot hodl!");
        uint256 endTime = block.timestamp + _hodlDuration;
        address sender = msg.sender;
        uint256 value = msg.value;
        Hodler memory newHodler = Hodler(endTime, sender, value, false);

        hodlerList.push(newHodler);

        hodlBankBalance += value;

        // Do actual transfer
        payable(hodlBank).transfer(value);

        // Logs information that can be picked up by moralis
        emit Hodl(hodlBankBalance, hodlBank, sender, value, endTime);
    }

    function payoutHodlers() public payable {
        require(msg.sender == hodlBank);
        for (uint256 i = 0; i < hodlerList.length; i++) {
            address currentHodlerAddress = hodlerList[i].hodlerAddress;
            bool readyToPayout = hodlerList[i].hodlEndTime < block.timestamp;
            bool redeemedStatus = hodlerList[i].redeemed;
            uint256 transferAmount = hodlerList[i].hodlAmount;
            if (readyToPayout) {
                if (redeemedStatus) {
                    // Make payment and do house cleaning
                    // reduce account balance by transfer amount
                    hodlBankBalance -= transferAmount;
                    // set the Hodl to redeemed
                    hodlerList[i].redeemed = true;
                    // Emit some information for moralis
                    emit RedeemHodl(
                        hodlBankBalance,
                        currentHodlerAddress,
                        hodlBank,
                        transferAmount,
                        hodlerList[i].hodlEndTime
                    );
                    payable(currentHodlerAddress).transfer(transferAmount);
                }
            }
        }
    }
}
