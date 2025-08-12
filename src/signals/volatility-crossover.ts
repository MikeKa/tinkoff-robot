/**
 * Сигнал volatility-crossover.
 * Рассчитываем значение volatility и ловим его пересечение с уровнями.
 */

/* eslint-disable max-statements */

import { Strategy } from '../strategy.js';
import { crossover, crossunder, volatility, toSeries} from '../utils/indicators.js';
import { Signal, SignalParams, SignalResult } from './base.js';

const defaultConfig = {
  /** Кол-во точек для расчета volatility */
  period: 14,
  /** Верхний уровень */
  highLevel: 70,
  /** Нижний уровень */
  lowLevel: 30,
};

export type VolatilityCrossoverSignalConfig = typeof defaultConfig;

export class VolatilityCrossoverSignal extends Signal<VolatilityCrossoverSignalConfig> {
  constructor(protected strategy: Strategy, config: VolatilityCrossoverSignalConfig) {
    super(strategy, Object.assign({}, defaultConfig, config));
  }

  get minCandlesCount() {
    return this.config.period + 1;
  }

  calc({ candles, profit }: SignalParams): SignalResult {
    const { period, lowLevel, highLevel } = this.config;
    const closePrices = this.getPrices(candles, 'close');
    const volatilityValue = volatility(closePrices, period);
    const low = toSeries(lowLevel, period);
    const high = toSeries(highLevel, period);
    if (crossunder(volatilityValue, low)) {
      this.logger.warn(`Актив перепродан, пора покупать`);
      return 'buy';
    }
    if (crossover(volatilityValue, high) && profit > 0) {
      this.logger.warn(`Актив перекуплен, пора продавать`);
      return 'sell';
    }
  }
}
