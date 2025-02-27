# Gestión de Usuarios y Permisos - Frontend
Este módulo maneja la autenticación y la asignación de permisos de usuarios en el frontend. Utiliza la información obtenida desde la API de usuarios y grupos para determinar qué funcionalidades puede acceder un usuario dentro del sistema.

## 📌 Caraterísticas
- Consumo del endpoint usuarios_y_grupos/: Obtiene la información de los usuarios, incluyendo su grupo y permisos.
- Consumo del endpoint grupos_de_permisos/: Permite gestionar la asignación de usuarios a distintos grupos.
- Filtrado de permisos por usuario: Se extraen los permisos del usuario autenticado y se almacenan en un estado global.
- Autorización de funcionalidades: Se ocultan o muestran elementos de la UI según los permisos del usuario.
- Gestión de roles de administrador: Los administradores pueden ver y modificar los grupos de otros usuarios.

### 📌  Flujo de Autenticación y Permisos
1. Autenticación
    - Se obtiene el access_token tras iniciar sesión.
    - Se ejecuta la acción getUsuarioYPermisos(access) para recuperar los datos del usuario autenticado.
2. Carga de Permisos del Usuario:
    - Se filtra el usuario con dniUser para extraer sus permisos.
    - Se almacenan en userPermissions y se utiliza useMemo para optimizar su uso.
3. Gestión de Accesos:
    - Se usa hasPermission.has("permiso") para determinar si el usuario puede acceder a ciertas funcionalidades.
4. Carga de Grupos de Permisos (Solo para Administradores):
    - Si el usuario tiene permisos para ver y modificar usuarios, se ejecuta getGrupos(access).
    - Se muestran los grupos disponibles en un Select, permitiendo modificar el grupo de un usuario.

## 📌 Ejemplo Estado Global y Carga de Permisos:

### Los datos del usuario y sus permisos se almacenan en el estado global con Redux Toolkit.
```
export const getUsuarioYPermisos = createAsyncThunk(
  'poda/getUsuarioYPermisos',
  async (access: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('http_method', 'GET');
      formData.append('app_name', process.env.NEXT_PUBLIC_UUID_PODA_1);
      formData.append('endpoint', `${process.env.NEXT_PUBLIC_URL_PODA_TESTING}/usuarios_y_grupos/`);
      formData.append('access_bahia', access);

      const response = await AxiosLoggedApiBahia.post(`proxy/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.results;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 'Error desconocido',
        message: error.response?.data?.detail || 'Detalles no disponibles',
      });
    }
  }
);
```

### Filtrar Permisos del Usuario Autenticado
```
useEffect(() => {
    if (access) {
        dispatch(getUsuarioYPermisos(access));
    }
},[]);

const userPermissions = useMemo(() => {
  if (!usuario_permisos.length) return [];
  
  const usuarioFiltrado = usuario_permisos.find(user => user.username.username == dniUser);
  return usuarioFiltrado?.groups[0]?.permissions || [];
}, [usuario_permisos]);

const hasPermission = useMemo(() => ({
  has: (permiso) => userPermissions.includes(permiso)
}), [userPermissions]);
```

### Uso en la UI
```
{hasPermission.has("change_user_groups") && (
  <Button
    onClick={handleClickAbmUsuariosPerfiles}
    borderRadius={4}
    fontWeight={"600"}
    h={"45px"}
    flex="1"
    fontSize={"16px"}
    paddingY="14px"
    background={'rose'}>
    <Text color={"darkblue"} marginLeft={"16px"}>USUARIOS</Text>
  </Button>
)}
```

## 📌  Carga de Grupos de Permisos (Solo para Administradores):
```
export const getGrupos = createAsyncThunk(
  'poda/getGrupos',
  async (access: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('http_method', 'GET');
      formData.append('app_name', process.env.NEXT_PUBLIC_UUID_PODA_1);
      formData.append('endpoint', `${process.env.NEXT_PUBLIC_URL_PODA_TESTING}/grupos_de_permisos/`);
      formData.append('access_bahia', access);

      const response = await AxiosLoggedApiBahia.post(`proxy/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.results;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 'Error desconocido',
        message: error.response?.data?.detail || 'Detalles no disponibles',
      });
    }
  }
);
```

## 📄 Posibles Escenarios de Permisos
| Escenario | Acción | Permiso Necesario |
|------------|-----------|-------------|
| Visualizar Usuarios | Ver la lista de usuarios | `view_user` |
| Modificar Grupo de Usuarios | Asignar un nuevo grupo a un usuario	| `change_user_groups` |
| Ver Solicitudes de Poda | Acceder al módulo de solicitudes | `view_solicitudpoda` |
| Ver Podadores | Acceder al módulo de podadores | `view_podador` |
| Ver Estados | Acceder a los estados de poda | `view_estado` |

