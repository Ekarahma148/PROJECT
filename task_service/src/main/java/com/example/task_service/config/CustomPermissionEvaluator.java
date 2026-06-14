// package com.example.task_service.config;

// import java.io.Serializable;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.access.PermissionEvaluator;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import com.example.task_service.utility.*;.entity.MenuAccessEntity;
// import com.example.task_service.utility.*;.entity.MenuEntity;
// import com.example.task_service.utility.*;.entity.RolesEntity;
// import com.example.task_service.utility.*;.entity.UsersEntity;
// import com.example.task_service.utility.*;.repository.MenuAccessRepository;
// import com.example.task_service.utility.*;.repository.MenuRepository;
// import com.example.task_service.utility.*;.repository.RolesRepository;
// import com.example.task_service.utility.*;.repository.UsersRepository;

// @Component
// public class CustomPermissionEvaluator implements PermissionEvaluator {

//     @Autowired
//     private UsersRepository usersRepository;

//     @Autowired
//     private RolesRepository roleRepository;

//     @Autowired
//     private MenuRepository menuRepository;

//     @Autowired
//     private MenuAccessRepository menuAccessRepository;

//     // definisikan authorization disini
//     @Override
//     public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
//         System.out.println("hello");
//         try {
//             String menuCodeStr = String.valueOf(targetDomainObject); 
//             // ex: menu_akademik, menu_mahasiswa, dll

//             String permissionStr = String.valueOf(permission); 
//             // ex: view, create, edit, delete, dll

//             if (authentication != null && targetDomainObject instanceof String) {

//                 Object principal = authentication.getPrincipal();

//                 String username = (principal instanceof UserDetails)
//                         ? ((UserDetails) principal).getUsername()
//                         : principal.toString();

//                 UsersEntity userEntity = usersRepository.findByUsername(username);
//                 RolesEntity roleEntity = roleRepository.findByRoleId(userEntity.getRoleId());

//                 MenuEntity menuEntity = menuRepository.findByMenuCode(menuCodeStr);

//                 MenuAccessEntity menuAccessEntity =
//                         menuAccessRepository.findByRoleIdAndMenuId(
//                             roleEntity.getRoleId(),
//                             menuEntity.getMenuId()
//                         );

//                 if (menuAccessEntity == null) return false;

//                 String[] arr = menuAccessEntity.getPermissions().split(",");

//                 for (String p : arr) {
//                     if (p.equals(permissionStr)) return true;
//                 }
//             }

//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//         return false;
//     }

//     @Override
//     public boolean hasPermission(Authentication authentication, Serializable targetId,
//                                  String targetType, Object permission) {
//         // TODO Auto-generated method stub
//         return false;
//     }
// }

