import { AminoMsg } from "@cosmjs/amino";
import { Long } from "@osmonauts/helpers";
import { MsgCreateStableswapPool, MsgStableSwapAdjustScalingFactors } from "./tx";
export interface AminoMsgCreateStableswapPool extends AminoMsg {
    type: "osmosis/gamm/poolmodels/stableswap/create-stableswap-pool";
    value: {
        sender: string;
        poolParams: {
            swapFee: string;
            exitFee: string;
        };
        initial_pool_liquidity: {
            denom: string;
            amount: string;
        }[];
        future_pool_governor: string;
    };
}
export interface AminoMsgStableSwapAdjustScalingFactors extends AminoMsg {
    type: "osmosis/gamm/poolmodels/stableswap/stable-swap-adjust-scaling-factors";
    value: {
        sender: string;
        pool_id: string;
        scaling_factors: Long[];
    };
}
export declare const AminoConverter: {
    "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgCreateStableswapPool": {
        aminoType: string;
        toAmino: ({ sender, poolParams, initialPoolLiquidity, futurePoolGovernor }: MsgCreateStableswapPool) => AminoMsgCreateStableswapPool["value"];
        fromAmino: ({ sender, poolParams, initial_pool_liquidity, future_pool_governor }: AminoMsgCreateStableswapPool["value"]) => MsgCreateStableswapPool;
    };
    "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgStableSwapAdjustScalingFactors": {
        aminoType: string;
        toAmino: ({ sender, poolId, scalingFactors }: MsgStableSwapAdjustScalingFactors) => AminoMsgStableSwapAdjustScalingFactors["value"];
        fromAmino: ({ sender, pool_id, scaling_factors }: AminoMsgStableSwapAdjustScalingFactors["value"]) => MsgStableSwapAdjustScalingFactors;
    };
};
