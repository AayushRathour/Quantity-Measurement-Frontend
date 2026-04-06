import axiosInstance from './axiosInstance'
import type { QuantityInputDTO, QuantityMeasurementDTO } from '../types'

type Endpoint =
  | 'compare'
  | 'convert'
  | 'add'
  | 'add-with-target-unit'
  | 'subtract'
  | 'subtract-with-target-unit'
  | 'divide'

export async function performQuantityOperation(
  endpoint: Endpoint,
  payload: QuantityInputDTO,
): Promise<QuantityMeasurementDTO> {
  const response = await axiosInstance.post<QuantityMeasurementDTO>(
    `/quantities/${endpoint}`,
    payload,
  )
  return response.data
}
