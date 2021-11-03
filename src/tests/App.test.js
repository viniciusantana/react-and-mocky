import { render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    global.fetch = jest.fn(async () => ({
      json: async () => responseAPI
    }));
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const rick = await screen.findByRole('heading', {
      level: 3,
      name: 'Rick Sanchez',
    });
    expect(rick).toBeInTheDocument();

  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {name: 'Buscar',});

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();


  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const smith = await screen.findAllByRole('heading', {
      level: 3,
      name: /smith/i,
    });
    expect(smith).toHaveLength(4);
  })

})
