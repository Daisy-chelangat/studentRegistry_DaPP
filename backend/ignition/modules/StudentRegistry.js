const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StudentRegistryModule", (m) => {
  const studentRegistry = m.contract("StudentRegistry");

  return { studentRegistry };
});
