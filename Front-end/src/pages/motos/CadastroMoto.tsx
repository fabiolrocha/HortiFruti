import React, { useState } from 'react';

const CadastroMoto: React.FC = () => {
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados para a API
        console.log({ modelo, placa, ano });
    };

    return (
        <div>
            <h1>Cadastro de Moto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Modelo:</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={e => setModelo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Placa:</label>
                    <input
                        type="text"
                        value={placa}
                        onChange={e => setPlaca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ano:</label>
                    <input
                        type="number"
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroMoto;