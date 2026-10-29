/**
 * Nemotron 2B Inference via WebGPU using @mlc-ai/web-llm
 *
 * Loads the Nemotron model once for the whole app.
 * Returns false if the model fails to load; the game then
 * uses its rule‑based fallbacks.
 */

/**
 * Initialize the Nemotron 2B model for game AI.
 * @returns {Promise<boolean>} True if the model loaded successfully.
 */
export async function initNemotronModel(): Promise<boolean> {
  try {
    const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

    // Load the 4‑bit quantized Nemotron‑2B model (~1.3 GB).
    // On first run the model is downloaded and cached in IndexedDB;
    // subsequent loads are almost instantaneous.
    // Uses custom appConfig to include Nemotron model not in default prebuilt list.
    // Starts downloading the model immediately upon initNemotronModel() call.
    const nemotronAppConfig = {
      model_list: [
        {
          model: 'https://huggingface.co/mlc-ai/nemotron-2b-instruct-q4f16_1/resolve/main/config.json',
          model_id: 'mlc-ai/nemotron-2b-instruct-q4f16_1',
          model_lib: 'https://huggingface.co/mlc-ai/nemotron-2b-instruct-q4f16_1-MLC/resolve/main/model.wasm',
        }
      ]
    };
    console.log('🤖 Starting Nemotron 2B model download (~1.3 GB) via WebGPU...');
    await CreateMLCEngine('mlc-ai/nemotron-2b-instruct-q4f16_1', { appConfig: nemotronAppConfig });
    console.log('✅ Nemotron 2B model loaded successfully via WebGPU');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to load Nemotron model:', error.message);
    return false;
  }
}
