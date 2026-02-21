// Substitua pelas suas configurações do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
};

async function checkout() {
    const btn = document.getElementById('btn-buy');
    btn.innerText = "Gerando PIX...";
    btn.disabled = true;

    try {
        // Chamada para a sua Firebase Function que processa o Mercado Pago
        const response = await fetch('https://SUA_REGIAO-SEU_PROJETO.cloudfunctions.net/createPixPayment', {
            method: 'POST',
            body: JSON.stringify({
                transaction_amount: 50.00,
                description: "Produto Exemplo",
                email: "comprador@email.com"
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.point_of_interaction) {
            document.getElementById('pix-container').style.display = 'block';
            document.getElementById('pix-code').value = data.point_of_interaction.transaction_data.qr_code;
            // Aqui você pode usar uma lib de QR Code para gerar a imagem
            alert("PIX Gerado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao gerar pagamento:", error);
        alert("Erro ao processar pagamento.");
    } finally {
        btn.innerText = "Comprar com PIX";
        btn.disabled = false;
    }
}
