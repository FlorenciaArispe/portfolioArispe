import React from 'react';

const Presentation = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen space-y-6 md:space-y-0 md:space-x-6">
      {/* Foto */}
      <div className="w-80 h-80 bg-gray-300 flex items-center justify-center">
        <p>FOTO</p>
      </div>

      {/* Descripción */}
      <div className="max-w-lg text-center md:text-left">
        <p className="text-lg">
          ¡Hola! Soy una desarrolladora apasionada por la creación de experiencias digitales atractivas e intuitivas.  
          Me especializo en el desarrollo front-end, combinando diseño y funcionalidad para construir interfaces modernas  
          y eficientes.
        </p>
      </div>
    </div>
  );
}

export default Presentation;
