// ============================================
// PROBLEMA: Coin Change (LeetCode #322 - Medium)
// ============================================
// Te dan un arreglo de monedas con denominaciones distintas y una cantidad
// de dinero. Retorna el número mínimo de monedas necesarias para hacer esa
// cantidad. Si es imposible, retorna -1.
//
// Ejemplo: coins=[1,2,5], amount=5
// Respuesta: 1 (una moneda de 5)
//
// Ejemplo: coins=[2], amount=3
// Respuesta: -1 (imposible)
//
// Complejidad objetivo: Tiempo O(amount * coins), Espacio O(amount)
// ============================================

/**
 * Solución: DP Tabulación - Bottom-Up
 *
 * Idea: Para cada cantidad i, calculamos el mínimo número de monedas
 * usando cada tipo de moneda disponible.
 *
 * Relación de recurrencia:
 * dp[i] = min(dp[i - coin] + 1) para cada moneda <= i
 *
 * dp[i] representa el mínimo de monedas para hacer la cantidad i
 */
function coinChange(coins, amount) {

}

/**
 * Solución alternativa: DP con rastreo (track) para obtener las monedas
 * Útil si necesitas saber CUÁLES son las monedas que se usan
 */
function coinChangeWithCoins(coins, amount) {

}

// ============================================
// TESTS
// ============================================
function runTests() {
  console.log("🧪 Ejecutando tests para Coin Change...\n");

  const testCases = [
    {
      coins: [1, 2, 5],
      amount: 5,
      expected: 1,
      description: "coins=[1,2,5], amount=5 -> una moneda de 5",
    },
    {
      coins: [2],
      amount: 3,
      expected: -1,
      description: "coins=[2], amount=3 -> imposible",
    },
    {
      coins: [10],
      amount: 10,
      expected: 1,
      description: "coins=[10], amount=10 -> exactamente una moneda",
    },
    {
      coins: [1],
      amount: 1,
      expected: 1,
      description: "coins=[1], amount=1 -> una moneda de 1",
    },
    {
      coins: [1, 3, 4],
      amount: 6,
      expected: 2,
      description: "coins=[1,3,4], amount=6 -> 3+3=2 monedas",
    },
    {
      coins: [2, 5, 10],
      amount: 27,
      expected: 4,
      description: "coins=[2,5,10], amount=27 -> 10+10+5+2=4 monedas",
    },
    {
      coins: [3, 5],
      amount: 9,
      expected: 3,
      description: "coins=[3,5], amount=9 -> 3+3+3 (no es posible con 5)",
    },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach(({ coins, amount, expected, description }) => {
    const result = coinChange(coins, amount);
    const resultWithCoins = coinChangeWithCoins(coins, amount);

    const success =
      result === expected && resultWithCoins.minCoins === expected;

    if (success) {
      console.log(`✅ PASS: ${description}`);
      console.log(`   coins: ${JSON.stringify(coins)}, amount: ${amount}`);
      console.log(`   Resultado: ${result}`);
      if (result !== -1) {
        console.log(`   Monedas usadas: ${JSON.stringify(resultWithCoins.coins)}`);
      }
      console.log();
      passed++;
    } else {
      console.log(`❌ FAIL: ${description}`);
      console.log(`   Expected: ${expected}, Got: ${result}\n`);
      failed++;
    }
  });

  console.log(`\n📊 Resultados: ${passed} passed, ${failed} failed`);
  console.log(`✨ ${failed === 0 ? "¡Todos los tests pasaron!" : "Hay fallos que corregir"}\n`);
}

// ============================================
// ANÁLISIS DE COMPLEJIDAD
// ============================================
/*
TIEMPO: O(amount * coins)
- Iteramos sobre cada cantidad de 0 a amount: O(amount)
- Para cada cantidad, iteramos sobre cada moneda: O(coins)
- Total: O(amount * coins)

ESPACIO: O(amount)
- El array dp tiene tamaño amount + 1

COMPARACIÓN CON ALTERNATIVAS:
- Recursión pura (sin memoización): O(∞) en el peor caso (ciclo infinito)
- Recursión con memoización: O(amount * coins) pero con overhead
- DP bottom-up es más eficiente
*/

// ============================================
// TIPS PARA LA ENTREVISTA
// ============================================
/*
1. RECONOCE EL PATRÓN:
   - "Cantidad mínima", "cantidad máxima" -> probablemente DP
   - "Todos los valores posibles" -> también DP
   - Este es un "unbounded knapsack" (puedes usar cada moneda múltiples veces)

2. INICIALIZA CORRECTAMENTE:
   - dp[0] = 0 (base: 0 monedas para 0 unidades)
   - Todo lo demás comienza en Infinity (o MAX_INT)
   - Esto diferencia entre "imposible" y "no calculado"

3. RELACIÓN DE RECURRENCIA:
   - dp[i] = min(dp[i - coin] + 1) para todas las monedas
   - Es decir: si uso una moneda, sumo 1 a la solución anterior

4. CASOS BORDE:
   - amount = 0 -> siempre 0
   - Imposible -> retorna -1
   - Solo una moneda que no divide amount -> imposible

5. OPTIMIZACIÓN: ORDEN DE LOOPS
   - NUNCA cambies el orden: primero cantidad, luego monedas
   - Si fuera al revés, contarías combinaciones diferentes

6. SEGUIMIENTO (TRACKING):
   - Si necesitas LAS MONEDAS (no solo el conteo), guarda parent[]
   - Esto permite reconstruir la solución al final
   - Común en entrevistas: "¿Cuáles son las monedas?"

7. VARIACIONES POSIBLES:
   - "Manera de hacer el dinero" -> número de combinaciones (no mínimo)
   - Solo cambias la recurrencia: dp[i] += dp[i - coin]
   - El estructura es la misma
*/

runTests();
