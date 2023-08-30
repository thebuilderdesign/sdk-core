'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var address = require('@ethersproject/address');

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["GOERLI"] = 5] = "GOERLI";
  ChainId[ChainId["SEPOLIA"] = 11155111] = "SEPOLIA";
  ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
  ChainId[ChainId["OPTIMISM_GOERLI"] = 420] = "OPTIMISM_GOERLI";
  ChainId[ChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  ChainId[ChainId["ARBITRUM_GOERLI"] = 421613] = "ARBITRUM_GOERLI";
  ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
  ChainId[ChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
  ChainId[ChainId["CELO"] = 42220] = "CELO";
  ChainId[ChainId["CELO_ALFAJORES"] = 44787] = "CELO_ALFAJORES";
  ChainId[ChainId["GNOSIS"] = 100] = "GNOSIS";
  ChainId[ChainId["MOONBEAM"] = 1284] = "MOONBEAM";
  ChainId[ChainId["BNB"] = 56] = "BNB";
  ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
  ChainId[ChainId["BASE_GOERLI"] = 84531] = "BASE_GOERLI";
  ChainId[ChainId["BASE"] = 8453] = "BASE";
  ChainId[ChainId["SCROLL_ALPHA"] = 719] = "SCROLL_ALPHA";
})(exports.ChainId || (exports.ChainId = {}));

var SUPPORTED_CHAINS = [exports.ChainId.MAINNET, exports.ChainId.OPTIMISM, exports.ChainId.OPTIMISM_GOERLI, exports.ChainId.ARBITRUM_ONE, exports.ChainId.ARBITRUM_GOERLI, exports.ChainId.POLYGON, exports.ChainId.POLYGON_MUMBAI, exports.ChainId.GOERLI, exports.ChainId.SEPOLIA, exports.ChainId.CELO_ALFAJORES, exports.ChainId.CELO, exports.ChainId.BNB, exports.ChainId.AVALANCHE, exports.ChainId.BASE, exports.ChainId.BASE_GOERLI, exports.ChainId.SCROLL_ALPHA];

(function (NativeCurrencyName) {
  // Strings match input for CLI
  NativeCurrencyName["ETHER"] = "ETH";
  NativeCurrencyName["MATIC"] = "MATIC";
  NativeCurrencyName["CELO"] = "CELO";
  NativeCurrencyName["GNOSIS"] = "XDAI";
  NativeCurrencyName["MOONBEAM"] = "GLMR";
  NativeCurrencyName["BNB"] = "BNB";
  NativeCurrencyName["AVAX"] = "AVAX";
  NativeCurrencyName["BONE"] = "BONE";
})(exports.NativeCurrencyName || (exports.NativeCurrencyName = {}));

var _CHAIN_TO_ADDRESSES_M, _GOVERNANCE_ALPHA_V1_, _GOVERNANCE_BRAVO_ADD, _MERKLE_DISTRIBUTOR_A, _ARGENT_WALLET_DETECT, _SOCKS_CONTROLLER_ADD;
var DEFAULT_NETWORKS = [exports.ChainId.MAINNET, exports.ChainId.GOERLI];

function constructSameAddressMap(address, additionalNetworks) {
  if (additionalNetworks === void 0) {
    additionalNetworks = [];
  }

  return DEFAULT_NETWORKS.concat(additionalNetworks).reduce(function (memo, chainId) {
    memo[chainId] = address;
    return memo;
  }, {});
}

var UNI_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', [exports.ChainId.OPTIMISM, exports.ChainId.ARBITRUM_ONE, exports.ChainId.POLYGON, exports.ChainId.POLYGON_MUMBAI, exports.ChainId.SEPOLIA]);
var UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = '0x8B799381ac40b838BBA4131ffB26197C432AFe78';
var V2_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
var V2_FACTORY_ADDRESSES = /*#__PURE__*/constructSameAddressMap(V2_FACTORY_ADDRESS);
var V2_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
var V2_ROUTER_ADDRESSES = /*#__PURE__*/constructSameAddressMap(V2_ROUTER_ADDRESS); // Networks that share most of the same addresses i.e. Mainnet, Goerli, Optimism, Arbitrum, Polygon

var DEFAULT_ADDRESSES = {
  v3CoreFactoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  multicallAddress: '0x1F98415757620B543A52E61c46B32eB19261F984',
  quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  v3MigratorAddress: '0xA5644E29708357803b5A882D272c41cC0dF92B34',
  nonfungiblePositionManagerAddress: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
};

var MAINNET_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  v1MixedRouteQuoterAddress: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E'
});

var GOERLI_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  v1MixedRouteQuoterAddress: '0xBa60b6e6fF25488308789E6e0A65D838be34194e'
});

var OPTIMISM_ADDRESSES = DEFAULT_ADDRESSES;

var ARBITRUM_ONE_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  multicallAddress: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  tickLensAddress: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573'
});

var POLYGON_ADDRESSES = DEFAULT_ADDRESSES; // celo v3 addresses

var CELO_ADDRESSES = {
  v3CoreFactoryAddress: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
  multicallAddress: '0x633987602DE5C4F337e3DbF265303A1080324204',
  quoterAddress: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
  v3MigratorAddress: '0x3cFd4d48EDfDCC53D3f173F596f621064614C582',
  nonfungiblePositionManagerAddress: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
  tickLensAddress: '0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D'
}; // BNB v3 addresses

var BNB_ADDRESSES = {
  v3CoreFactoryAddress: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
  multicallAddress: '0x963Df249eD09c358A4819E39d9Cd5736c3087184',
  quoterAddress: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
  v3MigratorAddress: '0x32681814957e0C13117ddc0c2aba232b5c9e760f',
  nonfungiblePositionManagerAddress: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
  tickLensAddress: '0xD9270014D396281579760619CCf4c3af0501A47C',
  swapRouter02Address: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2'
}; // optimism goerli addresses

var OPTIMISM_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0xB656dA17129e7EB733A557f4EBc57B76CFbB5d10',
  multicallAddress: '0x07F2D8a2a02251B62af965f22fC4744A5f96BCCd',
  quoterAddress: '0x9569CbA925c8ca2248772A9A4976A516743A246F',
  v3MigratorAddress: '0xf6c55fBe84B1C8c3283533c53F51bC32F5C7Aba8',
  nonfungiblePositionManagerAddress: '0x39Ca85Af2F383190cBf7d7c41ED9202D27426EF6',
  tickLensAddress: '0xe6140Bd164b63E8BfCfc40D5dF952f83e171758e'
}; // arbitrum goerli v3 addresses

var ARBITRUM_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6',
  multicallAddress: '0x8260CB40247290317a4c062F3542622367F206Ee',
  quoterAddress: '0x1dd92b83591781D0C6d98d07391eea4b9a6008FA',
  v3MigratorAddress: '0xA815919D2584Ac3F76ea9CB62E6Fd40a43BCe0C3',
  nonfungiblePositionManagerAddress: '0x622e4726a167799826d1E1D150b076A7725f5D81',
  tickLensAddress: '0xb52429333da969a0C79a60930a4Bf0020E5D1DE8'
}; // sepolia v3 addresses

var SEPOLIA_ADDRESSES = {
  v3CoreFactoryAddress: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
  multicallAddress: '0xD7F33bCdb21b359c8ee6F0251d30E94832baAd07',
  quoterAddress: '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
  v3MigratorAddress: '0x729004182cF005CEC8Bd85df140094b6aCbe8b15',
  nonfungiblePositionManagerAddress: '0x1238536071E1c677A632429e3655c799b22cDA52',
  tickLensAddress: '0xd7f33bcdb21b359c8ee6f0251d30e94832baad07'
}; // Avalanche v3 addresses

var AVALANCHE_ADDRESSES = {
  v3CoreFactoryAddress: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
  multicallAddress: '0x0139141Cd4Ee88dF3Cdb65881D411bAE271Ef0C2',
  quoterAddress: '0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F',
  v3MigratorAddress: '0x44f5f1f5E452ea8d29C890E8F6e893fC0f1f0f97',
  nonfungiblePositionManagerAddress: '0x655C406EBFa14EE2006250925e54ec43AD184f8B',
  tickLensAddress: '0xEB9fFC8bf81b4fFd11fb6A63a6B0f098c6e21950',
  swapRouter02Address: '0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE'
};
var BASE_ADDRESSES = {
  v3CoreFactoryAddress: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  multicallAddress: '0x091e99cb1C49331a94dD62755D168E941AbD0693',
  quoterAddress: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  v3MigratorAddress: '0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7',
  nonfungiblePositionManagerAddress: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
  tickLensAddress: '0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d',
  swapRouter02Address: '0x2626664c2603336E57B271c5C0b26F421741e481'
}; // Base Goerli v3 addresses

var BASE_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0x9323c1d6D800ed51Bd7C6B216cfBec678B7d0BC2',
  multicallAddress: '0xB206027a9E0E13F05eBEFa5D2402Bab3eA716439',
  quoterAddress: '0xedf539058e28E5937dAef3f69cEd0b25fbE66Ae9',
  v3MigratorAddress: '0x3efe5d02a04b7351D671Db7008ec6eBA9AD9e3aE',
  nonfungiblePositionManagerAddress: '0x3c61369ef0D1D2AFa70d8feC2F31C5D6Ce134F30',
  tickLensAddress: '0x1acB873Ee909D0c98adB18e4474943249F931b92',
  swapRouter02Address: '0x8357227D4eDc78991Db6FDB9bD6ADE250536dE1d'
};
var SCROLL_ALPHA__ADDRESSES = {
  v3CoreFactoryAddress: '0x2efdCC48F7268f6D18098b3446C039B9D6Faed64',
  multicallAddress: '0x3abfC366Ca7B41d0DfAB52732e66CAc5942451c7',
  quoterAddress: '0x09068F861546398b9651A69119CE4198685022D1',
  v3MigratorAddress: '0x9021fbA79c521d9b4ACb58A2502505f4695fFeD9',
  nonfungiblePositionManagerAddress: '0xEcb58734BDE0cE497Fe5B10b9F794Eb28d7cA596',
  tickLensAddress: '0xf6B55EE9Bd1632337a2F23a9c2020a8512778425',
  swapRouter02Address: '0xe8fa3C0CB67E16bF4aeF897f2aD37fcE92019403'
};
var CHAIN_TO_ADDRESSES_MAP = (_CHAIN_TO_ADDRESSES_M = {}, _CHAIN_TO_ADDRESSES_M[exports.ChainId.MAINNET] = MAINNET_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.OPTIMISM] = OPTIMISM_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ARBITRUM_ONE] = ARBITRUM_ONE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.POLYGON] = POLYGON_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.POLYGON_MUMBAI] = POLYGON_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.GOERLI] = GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.CELO] = CELO_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.CELO_ALFAJORES] = CELO_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BNB] = BNB_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.OPTIMISM_GOERLI] = OPTIMISM_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ARBITRUM_GOERLI] = ARBITRUM_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.SEPOLIA] = SEPOLIA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.AVALANCHE] = AVALANCHE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BASE] = BASE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BASE_GOERLI] = BASE_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.SCROLL_ALPHA] = SCROLL_ALPHA__ADDRESSES, _CHAIN_TO_ADDRESSES_M);
/* V3 Contract Addresses */

var V3_CORE_FACTORY_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress;
  return memo;
}, {}));
var V3_MIGRATOR_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var v3MigratorAddress = CHAIN_TO_ADDRESSES_MAP[chainId].v3MigratorAddress;

  if (v3MigratorAddress) {
    memo[chainId] = v3MigratorAddress;
  }

  return memo;
}, {}));
var MULTICALL_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress;
  return memo;
}, {}));
/**
 * The oldest V0 governance address
 */

var GOVERNANCE_ALPHA_V0_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F');
/**
 * The older V1 governance address
 */

var GOVERNANCE_ALPHA_V1_ADDRESSES = (_GOVERNANCE_ALPHA_V1_ = {}, _GOVERNANCE_ALPHA_V1_[exports.ChainId.MAINNET] = '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6', _GOVERNANCE_ALPHA_V1_);
/**
 * The latest governor bravo that is currently admin of timelock
 */

var GOVERNANCE_BRAVO_ADDRESSES = (_GOVERNANCE_BRAVO_ADD = {}, _GOVERNANCE_BRAVO_ADD[exports.ChainId.MAINNET] = '0x408ED6354d4973f66138C91495F2f2FCbd8724C3', _GOVERNANCE_BRAVO_ADD);
var TIMELOCK_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC');
var MERKLE_DISTRIBUTOR_ADDRESS = (_MERKLE_DISTRIBUTOR_A = {}, _MERKLE_DISTRIBUTOR_A[exports.ChainId.MAINNET] = '0x090D4613473dEE047c3f2706764f49E0821D256e', _MERKLE_DISTRIBUTOR_A);
var ARGENT_WALLET_DETECTOR_ADDRESS = (_ARGENT_WALLET_DETECT = {}, _ARGENT_WALLET_DETECT[exports.ChainId.MAINNET] = '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8', _ARGENT_WALLET_DETECT);
var QUOTER_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress;
  return memo;
}, {}));
var NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var nonfungiblePositionManagerAddress = CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress;

  if (nonfungiblePositionManagerAddress) {
    memo[chainId] = nonfungiblePositionManagerAddress;
  }

  return memo;
}, {}));
var ENS_REGISTRAR_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/constructSameAddressMap('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'));
var SOCKS_CONTROLLER_ADDRESSES = (_SOCKS_CONTROLLER_ADD = {}, _SOCKS_CONTROLLER_ADD[exports.ChainId.MAINNET] = '0x65770b5283117639760beA3F867b69b3697a91dd', _SOCKS_CONTROLLER_ADD);
var TICK_LENS_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var tickLensAddress = CHAIN_TO_ADDRESSES_MAP[chainId].tickLensAddress;

  if (tickLensAddress) {
    memo[chainId] = tickLensAddress;
  }

  return memo;
}, {}));
var MIXED_ROUTE_QUOTER_V1_ADDRESSES = /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var v1MixedRouteQuoterAddress = CHAIN_TO_ADDRESSES_MAP[chainId].v1MixedRouteQuoterAddress;

  if (v1MixedRouteQuoterAddress) {
    memo[chainId] = v1MixedRouteQuoterAddress;
  }

  return memo;
}, {});
var SWAP_ROUTER_02_ADDRESSES = function SWAP_ROUTER_02_ADDRESSES(chainId) {
  if (chainId == exports.ChainId.BNB) {
    return CHAIN_TO_ADDRESSES_MAP[chainId].swapRouter02Address;
  }

  return '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
};

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var MaxUint256 = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = JSBI.BigInt(1);
    }

    this.numerator = JSBI.BigInt(numerator);
    this.denominator = JSBI.BigInt(denominator);
  }

  Fraction.tryParseFraction = function tryParseFraction(fractionish) {
    if (fractionish instanceof JSBI || typeof fractionish === 'number' || typeof fractionish === 'string') return new Fraction(fractionish);
    if ('numerator' in fractionish && 'denominator' in fractionish) return fractionish;
    throw new Error('Could not parse fraction');
  } // performs floor division
  ;

  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = Fraction.tryParseFraction(other);

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = Fraction.tryParseFraction(other);

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  }
  /**
   * Helper method for converting any super class back to a fraction
   */
  ;

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }, {
    key: "asFraction",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  function CurrencyAmount(currency, numerator, denominator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    !JSBI.lessThanOrEqual(_this.quotient, MaxUint256) ?  invariant(false, 'AMOUNT')  : void 0;
    _this.currency = currency;
    _this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(currency.decimals));
    return _this;
  }
  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */


  CurrencyAmount.fromRawAmount = function fromRawAmount(currency, rawAmount) {
    return new CurrencyAmount(currency, rawAmount);
  }
  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  ;

  CurrencyAmount.fromFractionalAmount = function fromFractionalAmount(currency, numerator, denominator) {
    return new CurrencyAmount(currency, numerator, denominator);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !this.currency.equals(other.currency) ?  invariant(false, 'CURRENCY')  : void 0;

    var added = _Fraction.prototype.add.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, added.numerator, added.denominator);
  };

  _proto.subtract = function subtract(other) {
    !this.currency.equals(other.currency) ?  invariant(false, 'CURRENCY')  : void 0;

    var subtracted = _Fraction.prototype.subtract.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, subtracted.numerator, subtracted.denominator);
  };

  _proto.multiply = function multiply(other) {
    var multiplied = _Fraction.prototype.multiply.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, multiplied.numerator, multiplied.denominator);
  };

  _proto.divide = function divide(other) {
    var divided = _Fraction.prototype.divide.call(this, other);

    return CurrencyAmount.fromFractionalAmount(this.currency, divided.numerator, divided.denominator);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.divide.call(this, this.decimalScale).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.divide.call(this, this.decimalScale).toFixed(decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "wrapped",
    get: function get() {
      if (this.currency.isToken) return this;
      return CurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator, this.denominator);
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var ONE_HUNDRED = /*#__PURE__*/new Fraction( /*#__PURE__*/JSBI.BigInt(100));
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */

function toPercent(fraction) {
  return new Percent(fraction.numerator, fraction.denominator);
}

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    var _this;

    _this = _Fraction.apply(this, arguments) || this;
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */

    _this.isPercent = true;
    return _this;
  }

  var _proto = Percent.prototype;

  _proto.add = function add(other) {
    return toPercent(_Fraction.prototype.add.call(this, other));
  };

  _proto.subtract = function subtract(other) {
    return toPercent(_Fraction.prototype.subtract.call(this, other));
  };

  _proto.multiply = function multiply(other) {
    return toPercent(_Fraction.prototype.multiply.call(this, other));
  };

  _proto.divide = function divide(other) {
    return toPercent(_Fraction.prototype.divide.call(this, other));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  function Price() {
    var _this;

    var baseCurrency, quoteCurrency, denominator, numerator;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 4) {
      baseCurrency = args[0];
      quoteCurrency = args[1];
      denominator = args[2];
      numerator = args[3];
    } else {
      var result = args[0].quoteAmount.divide(args[0].baseAmount);
      var _ref = [args[0].baseAmount.currency, args[0].quoteAmount.currency, result.denominator, result.numerator];
      baseCurrency = _ref[0];
      quoteCurrency = _ref[1];
      denominator = _ref[2];
      numerator = _ref[3];
    }

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }
  /**
   * Flip the price, switching the base and quote currency
   */


  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  }
  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */
  ;

  _proto.multiply = function multiply(other) {
    !this.quoteCurrency.equals(other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyAmount.currency.equals(this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var result = _Fraction.prototype.multiply.call(this, currencyAmount);

    return CurrencyAmount.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator);
  }
  /**
   * Get the value scaled by decimals for formatting
   * @private
   */
  ;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "adjustedForDecimals",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */

var BaseCurrency =
/**
 * Constructs an instance of the base class `BaseCurrency`.
 * @param chainId the chain ID on which this currency resides
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function BaseCurrency(chainId, decimals, symbol, name) {
  !Number.isSafeInteger(chainId) ?  invariant(false, 'CHAIN_ID')  : void 0;
  !(decimals >= 0 && decimals < 255 && Number.isInteger(decimals)) ?  invariant(false, 'DECIMALS')  : void 0;
  this.chainId = chainId;
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};

/**
 * Represents the native currency of the chain on which it resides, e.g.
 */

var NativeCurrency = /*#__PURE__*/function (_BaseCurrency) {
  _inheritsLoose(NativeCurrency, _BaseCurrency);

  function NativeCurrency() {
    var _this;

    _this = _BaseCurrency.apply(this, arguments) || this;
    _this.isNative = true;
    _this.isToken = false;
    return _this;
  }

  return NativeCurrency;
}(BaseCurrency);

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */

function validateAndParseAddress(address$1) {
  try {
    return address.getAddress(address$1);
  } catch (error) {
    throw new Error(address$1 + " is not a valid address.");
  }
} // Checks a string starts with 0x, is 42 characters long and contains only hex characters after 0x

var startsWith0xLen42HexRegex = /^0x[0-9a-fA-F]{40}$/;
/**
 * Checks if an address is valid by checking 0x prefix, length === 42 and hex encoding.
 * @param address the unchecksummed hex address
 */

function checkValidAddress(address) {
  if (startsWith0xLen42HexRegex.test(address)) {
    return address;
  }

  throw new Error(address + " is not a valid address.");
}

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_BaseCurrency) {
  _inheritsLoose(Token, _BaseCurrency);

  /**
   *
   * @param chainId {@link BaseCurrency#chainId}
   * @param address The contract address on the chain on which this token lives
   * @param decimals {@link BaseCurrency#decimals}
   * @param symbol {@link BaseCurrency#symbol}
   * @param name {@link BaseCurrency#name}
   * @param bypassChecksum If true it only checks for length === 42, startsWith 0x and contains only hex characters
   */
  function Token(chainId, address, decimals, symbol, name, bypassChecksum) {
    var _this;

    _this = _BaseCurrency.call(this, chainId, decimals, symbol, name) || this;
    _this.isNative = false;
    _this.isToken = true;

    if (bypassChecksum) {
      _this.address = checkValidAddress(address);
    } else {
      _this.address = validateAndParseAddress(address);
    }

    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    return other.isToken && this.chainId === other.chainId && this.address.toLowerCase() === other.address.toLowerCase();
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address.toLowerCase() !== other.address.toLowerCase()) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
  /**
   * Return this token, which does not need to be wrapped
   */
  ;

  _createClass(Token, [{
    key: "wrapped",
    get: function get() {
      return this;
    }
  }]);

  return Token;
}(BaseCurrency);

var _WETH;
/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */

var WETH9 = (_WETH = {}, _WETH[1] = /*#__PURE__*/new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'), _WETH[3] = /*#__PURE__*/new Token(3, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'), _WETH[4] = /*#__PURE__*/new Token(4, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'), _WETH[5] = /*#__PURE__*/new Token(5, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'), _WETH[42] = /*#__PURE__*/new Token(42, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'), _WETH[10] = /*#__PURE__*/new Token(10, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'), _WETH[69] = /*#__PURE__*/new Token(69, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'), _WETH[42161] = /*#__PURE__*/new Token(42161, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'), _WETH[421611] = /*#__PURE__*/new Token(421611, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether'), _WETH);

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */

var Ether = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Ether, _NativeCurrency);

  function Ether(chainId) {
    return _NativeCurrency.call(this, chainId, 18, 'BONE', 'BONE') || this;
  }

  Ether.onChain = function onChain(chainId) {
    var _this$_etherCache$cha;

    return (_this$_etherCache$cha = this._etherCache[chainId]) != null ? _this$_etherCache$cha : this._etherCache[chainId] = new Ether(chainId);
  };

  var _proto = Ether.prototype;

  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };

  _createClass(Ether, [{
    key: "wrapped",
    get: function get() {
      var weth9 = WETH9[this.chainId];
      !!!weth9 ?  invariant(false, 'WRAPPED')  : void 0;
      return weth9;
    }
  }]);

  return Ether;
}(NativeCurrency);
Ether._etherCache = {};

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var quotedOutputAmount = midPrice.quote(inputAmount); // calculate price impact := (exactQuote - outputAmount) / exactQuote

  var priceImpact = quotedOutputAmount.subtract(outputAmount).divide(quotedOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}

// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

var MAX_SAFE_INTEGER = /*#__PURE__*/JSBI.BigInt(Number.MAX_SAFE_INTEGER);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */

function sqrt(value) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, 'NEGATIVE')  : void 0; // rely on built in sqrt if possible

  if (JSBI.lessThan(value, MAX_SAFE_INTEGER)) {
    return JSBI.BigInt(Math.floor(Math.sqrt(JSBI.toNumber(value))));
  }

  var z;
  var x;
  z = value;
  x = JSBI.add(JSBI.divide(value, TWO), ONE);

  while (JSBI.lessThan(x, z)) {
    z = x;
    x = JSBI.divide(JSBI.add(JSBI.divide(value, x), x), TWO);
  }

  return z;
}

exports.ARGENT_WALLET_DETECTOR_ADDRESS = ARGENT_WALLET_DETECTOR_ADDRESS;
exports.CHAIN_TO_ADDRESSES_MAP = CHAIN_TO_ADDRESSES_MAP;
exports.CurrencyAmount = CurrencyAmount;
exports.ENS_REGISTRAR_ADDRESSES = ENS_REGISTRAR_ADDRESSES;
exports.Ether = Ether;
exports.Fraction = Fraction;
exports.GOVERNANCE_ALPHA_V0_ADDRESSES = GOVERNANCE_ALPHA_V0_ADDRESSES;
exports.GOVERNANCE_ALPHA_V1_ADDRESSES = GOVERNANCE_ALPHA_V1_ADDRESSES;
exports.GOVERNANCE_BRAVO_ADDRESSES = GOVERNANCE_BRAVO_ADDRESSES;
exports.MERKLE_DISTRIBUTOR_ADDRESS = MERKLE_DISTRIBUTOR_ADDRESS;
exports.MIXED_ROUTE_QUOTER_V1_ADDRESSES = MIXED_ROUTE_QUOTER_V1_ADDRESSES;
exports.MULTICALL_ADDRESSES = MULTICALL_ADDRESSES;
exports.MaxUint256 = MaxUint256;
exports.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = NONFUNGIBLE_POSITION_MANAGER_ADDRESSES;
exports.NativeCurrency = NativeCurrency;
exports.Percent = Percent;
exports.Price = Price;
exports.QUOTER_ADDRESSES = QUOTER_ADDRESSES;
exports.SOCKS_CONTROLLER_ADDRESSES = SOCKS_CONTROLLER_ADDRESSES;
exports.SUPPORTED_CHAINS = SUPPORTED_CHAINS;
exports.SWAP_ROUTER_02_ADDRESSES = SWAP_ROUTER_02_ADDRESSES;
exports.TICK_LENS_ADDRESSES = TICK_LENS_ADDRESSES;
exports.TIMELOCK_ADDRESSES = TIMELOCK_ADDRESSES;
exports.Token = Token;
exports.UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS;
exports.UNI_ADDRESSES = UNI_ADDRESSES;
exports.V2_FACTORY_ADDRESS = V2_FACTORY_ADDRESS;
exports.V2_FACTORY_ADDRESSES = V2_FACTORY_ADDRESSES;
exports.V2_ROUTER_ADDRESS = V2_ROUTER_ADDRESS;
exports.V2_ROUTER_ADDRESSES = V2_ROUTER_ADDRESSES;
exports.V3_CORE_FACTORY_ADDRESSES = V3_CORE_FACTORY_ADDRESSES;
exports.V3_MIGRATOR_ADDRESSES = V3_MIGRATOR_ADDRESSES;
exports.WETH9 = WETH9;
exports.computePriceImpact = computePriceImpact;
exports.sortedInsert = sortedInsert;
exports.sqrt = sqrt;
exports.validateAndParseAddress = validateAndParseAddress;
//# sourceMappingURL=sdk-core.cjs.development.js.map
