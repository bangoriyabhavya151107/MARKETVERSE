/**
 * Central Stock Exchange Complex Inspector.
 */
export function mountExchangeInspector(titleEl, bodyEl) {
  titleEl.textContent = 'Central Stock Exchange HQ';
  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>What a Stock Exchange Does (NSE / BSE Context)</strong>
      <p style="font-size:12px; margin-top:4px;">
        A stock exchange provides a regulated, transparent electronic marketplace where buyers and sellers discover prices and match orders according to strict <strong>Price-Time Priority</strong> rules.
      </p>
    </div>

    <div class="section-card">
      <h4>4 Connected Exchange Functions</h4>
      <p style="font-size:11.5px; color:var(--text-secondary); margin-bottom:8px;">
        Notice the four distinct wings around the Central Exchange Rotunda, connecting to the Market Infrastructure District:
      </p>
      <ul style="padding-left:16px; font-size:12px; color:var(--text-primary); display:flex; flex-direction:column; gap:6px;">
        <li><strong>1. Order Matching Engine:</strong> Matches buy (bid) and sell (ask) limit and market orders in microseconds.</li>
        <li><strong>2. Clearing Handoff:</strong> Transmits matched trades to the Clearing Corporation (CCP) for counterparty novation.</li>
        <li><strong>3. Settlement Coordination:</strong> Links with Depositories and Clearing Banks to complete T+1 delivery and payment.</li>
        <li><strong>4. Market-Data Broadcast:</strong> Publishes real-time order-book depth, trades, and official index ticks.</li>
      </ul>
    </div>

    <div class="edu-block warn">
      <strong>Crucial Institutional Distinction:</strong>
      <p style="font-size:11.5px; margin-top:4px;">
        The stock exchange itself does <em>not</em> hold your demat shares (Depositories do), does <em>not</em> take retail client orders directly (Brokers do), and does <em>not</em> set stock prices (buyer and seller order flow does).
      </p>
    </div>
  `;
}