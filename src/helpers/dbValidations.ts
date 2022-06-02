import Categoria from '../models/Categoria';
import Producto from '../models/Producto';
import Role from '../models/Role';
import User from '../models/User';

export const validRole = async (role: string) => {
  // Validar que se ingrese un rol válido
  const existRole = await Role.findOne({ role });
  if (!existRole) throw new Error(`El rol ${role} no esta registrado en la DB`);
};

export const validEmail = async (email: string) => {
  // Validar que el correo no este registrado
  const existEmail = await User.findOne({ email });
  if (existEmail)
    throw new Error(`El correo ${email} ya se encuentra registrado`);
};

export const validUserById = async (id: string) => {
  // Validar que el usuario este registrado
  const exisUserById = await User.findById(id);
  if (!exisUserById || !exisUserById.state)
    throw new Error(`El ID ${id} no existe`);
};

export const validCategoriaExists = async (name: string) => {
  // Validar que la categoría no este duplicada
  const exisCategory = await Categoria.findOne({ name: name.toUpperCase() });
  if (exisCategory)
    throw new Error(`La categoría ${name.toUpperCase()} ya existe`);
};

export const validCategoriaExistsByID = async (id: string) => {
  // Validar que la categoría este registrada
  const exisCategory = await Categoria.findById(id);
  if (!exisCategory || !exisCategory.state)
    throw new Error(`La categoría con ID ${id} no existe`);
};

export const validProductoExists = async (name: string) => {
  // Validar que el producto no este duplicado
  const exisProducto = await Producto.findOne({
    name: name.toLocaleUpperCase(),
  });
  if (exisProducto)
    throw new Error(`El producto ${name.toLocaleUpperCase()} ya existe`);
};

export const validProductoExistsByID = async (id: string) => {
  // Validar que el producto exista
  const exisProductoById = await Producto.findById(id);
  if (!exisProductoById || !exisProductoById.state)
    throw new Error(`El ID ${id} no existe`);
};

export const permitCategory = (
  colection: string,
  colections: string[]
): boolean => {
  if (!colections.includes(colection)) {
    throw new Error(`La colección ${colection} no es permitida, ${colections}`);
  }

  return true;
};
